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
