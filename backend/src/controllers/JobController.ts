import { Datasource, Prisma, PrismaClient } from "@prisma/client";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
  JsonController,
  Authorized,
  CurrentUser,
  Patch,
} from "routing-controllers";
import { Dictionary } from "typed-two-way-map";
import { BigQueryService } from "../services/BigQueryService";
import { GetroService } from "../services/GetroService";
import { createJob, getAppliedJobsByUser, updateJob } from "../services/Job";
import {
  DATASET_BULLHORN,
  DATASET_GETRO,
  FilterOption,
  Job,
  FilterBody,
  JobSearchByFilterResponse,
  JobSearchByID,
  DataSource,
  Tables,
  ApplyResponse,
  GetSavedJobsResponse,
  AdvancedFilterOption,
  DATASET_MAIN,
  DataSources,
  Operator,
} from "../types/Common";
import { ALLOWED_GETRO_FILTERS } from "../types/Getro";
import { ALLOWED_JOB_KEYS, JobKey } from "../types/Job";
import { User } from "../types/User";
import { consoleLog, getDataSource, getFilterConditions } from "../utils";
import db from "../utils/db";
import { JobFilter } from "../utils/FieldMatch";
import {
  getCandidatesOnJob,
  getSavedJobs,
  saveApplication,
  saveJob,
} from "../utils/MainCrud";

import { BullhornService } from "../services/BullhornService";

@JsonController("/api/job")
export class JobController {
  @Get("/search")
  async searchJobByID(@QueryParam("id") id: string) {
    try {
      const job = await db.job.findFirst({
        where: {
          id,
        },
        include: {
          getroJobInfo: true,
          company: true,
        },
      });

      let getroCompany
      if (job?.company?.companyURL) {
        getroCompany = await db.getroCompany.findFirst({
          select: {
            domain: true,
            logo_url: true,
          },
          where: {
            domain: {
              in: job?.company?.companyURL
            }
          }
        })
      }

      if (job && job.company && getroCompany) {
        job.company.logo = getroCompany.logo_url;
      }

      if (job) {
        return {
          job: {
            ...(job?.getroJobInfo || {}),
            ...job,
            clientCorporation: job.company?.name,
            company_logo: getroCompany?.logo_url
          },
        };
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  @Post("/run-job")
  async runJob(@Body() body: any) {
    try {
      consoleLog("/// BULLHORN_GET_JOBS");
      await (await BullhornService.getClient()).getJobs(false, 50);
      return { success: true };
    } catch (error) {
      consoleLog(error);
      return { success: false, error };
    }
  }

  @Post("/search")
  async searchByFilter(
    @Body() body: FilterBody & { datasource?: DataSources }
  ) {
    try {
      const { filters, fields, page, count, datasource } = body;

      const datasourceToEnum: Dictionary<Datasource> = {
        main: Datasource.main,
        bullhorn: Datasource.bullhorn,
        getro: Datasource.getro,
      };

      const _datasource = datasource ? datasourceToEnum[datasource] : undefined;

      const _filters = normalizeFilters(filters)
      const where: any = {
        datasource: _datasource as any,
        ..._filters,
      }

      const skip = (count || 0) * ((page - 1) || 0)

      const jobPromise = db.job.findMany({
        where,
        take: count,
        skip: skip < 0 ? 0 : skip,
        include: {
          company: true,
          category: true,
        },
        orderBy: [
          {
            externalId: "asc",
          },
          { createdAt: 'desc' }
        ]
      }); // TODO: assumes we are changing frontend to pass compatible fields and filters params

      const totalPromise = db.job.count({
        where,
      });

      const [jobs, total] = await Promise.all([jobPromise, totalPromise]);

      const companyURLs = jobs.filter(job => job.company?.companyURL)
        .map((job: any) => job.company.companyURL) as string[]
      const getroCompanies = await db.getroCompany.findMany({
        select: {
          domain: true,
          logo_url: true,
        },
        where: {
          domain: {
            in: companyURLs
          }
        }
      })
      const extendedJobs = jobs.map((job: any) => {
        const getroCompany = getroCompanies.find((gc: any) => gc.domain === job.company?.companyURL)
        if (getroCompany) {
          job.company.logo = getroCompany.logo_url
        }
        job.company_name = job.company?.name
        job.company_logo = job.company?.logo
        return job
      })

      // console.log({ jobs });

      return {
        jobs: extendedJobs,
        total,
        message: null,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
      };
    }
  }

  @Authorized()
  // TODO: Extract all of these query/filter logic into its own service
  async getJobsByFilterFromMain(
    filters: AdvancedFilterOption[] = [],
    fields: string[] | undefined,
    count: number | undefined,
    operator: Operator = "OR"
  ) {
    const _filters = filters.filter((filter) =>
      ALLOWED_JOB_KEYS.has(filter.key as JobKey)
    );

    const filteredFields = fields?.filter((field) =>
      ALLOWED_JOB_KEYS.has(field as JobKey)
    );

    const alias = "main_jobs";
    const companyAlias = "company";

    const _fields = filteredFields?.length
      ? filteredFields.join(", ")
      : `${alias}.*, ${companyAlias}.bh_url as company_url, ${companyAlias}.name as company_name, ${companyAlias}.logo as company_logo`;

    const specialHandlers = {
      company_name: (_: string, value: string) =>
        `LOWER(${companyAlias}.name) LIKE '%${value.toLowerCase()}%'`,
    };

    const condition = getFilterConditions(
      _filters,
      operator,
      specialHandlers
    );
    const dataset = DATASET_MAIN;
    const table = Tables.JOBS;

    const _join = `
      LEFT JOIN \`${DATASET_MAIN}.${Tables.JOINED_COMPANIES}\` as ${companyAlias} 
      ON REPLACE(${alias}.companyId, "bh-", "bl-")  = ${companyAlias}.bh_id
      `;

    return await BigQueryService.selectQuery(
      dataset,
      table,
      _fields,
      count,
      condition,
      _join,
      alias
    );
  }

  async getJobsByFilterFromGetro(
    filters: AdvancedFilterOption[] = [],
    fields: string[] | undefined,
    count: number | undefined,
    operator: Operator = "OR"
  ) {
    const _filters = filters.filter((filter) =>
      ALLOWED_GETRO_FILTERS.has(filter.key as keyof Job)
    );

    const filteredFields = fields?.filter((field) =>
      ALLOWED_GETRO_FILTERS.has(field as keyof Job)
    );
    const _fields = filteredFields?.length ? filteredFields.join(", ") : "*";
