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
