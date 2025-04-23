import {
  Body,
  Get,
  Post,
  Put,
  QueryParam,
  JsonController,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { BigQueryService } from "../services/BigQueryService";
import { BullhornService } from "../services/BullhornService";
import { getSavedCompanies, saveCompany } from "../services/Company";
import {
  DATASET_BULLHORN,
  DATASET_GETRO,
  FilterOption,
  Job,
  FilterBody,
  DataSource,
  Tables,
  Company,
  CompanySearchByID,
  CompanySearchByFilterResponse,
  DATASET_MAIN,
  ApplyResponse,
  Operator,
} from "../types/Common";
import { User } from "../types/User";
import { getDataSource, getFilterConditions } from "../utils";
import db from "../utils/db";

import {
  CompanyFilter,
  CompanyFilterKey,
  JobFilter,
} from "../utils/FieldMatch";
import { COORDINATOR } from "../utils/constant";
import { sendCandidatesToEmployers } from "../services/EmailService";
import { getCandidatesList } from "../services/Candidate";
import { normalizeFilters } from "./JobController";

@JsonController("/api/company")
export class CompanyController {
  @Get("/search")
  async searchJobByID(
    @QueryParam("id") id: string
  ): Promise<CompanySearchByID> {
    const datasource = getDataSource(id);
    if (datasource === DataSource.BULLHORN) {
      const company = await this.getCompanyByIdFromBullhorn(id);
      return {
        company,
        source: datasource,
      };
    } else if (datasource === DataSource.GETRO) {
      const company = await this.getCompanyByIdFromGetro(id);
      return {
        company,
        source: datasource,
      };
    } else {
      return {
        source: DataSource.UNKNOWN,
        message: "unsupported id",
      };
    }
  }

  @Authorized()
  @Put("/save")
  async save(
    @CurrentUser() authUser: User,
    @Body() body: { company: string; candidate?: string }
  ): Promise<ApplyResponse> {
    return await saveCompany(body.company, body.candidate! || authUser.id!);
  }

  @Authorized()
  @Put("/send_candidates_to_employers")
  async send_candidates_to_employers(
    @CurrentUser() authUser: User,
    @Body() body: { candidates_ids: string[], employers_emails: string[] }
  ): Promise<any> {
    if (authUser.role !== COORDINATOR) {
      return {
        result: false,
        error: "You should be a coordinator for sending candidates to employers",
      };
    }
    try {
      const candidates_list = await getCandidatesList(body.candidates_ids);
      return {
        result: await sendCandidatesToEmployers(
          candidates_list,
          body.employers_emails
        )
      }
    } catch (error) {
      return {
        result: false,
        error: "Please check email, email maybe invalid one",
      };
    }
  }

  @Authorized()
  @Put()
  async insert(
    @Body() body: Company,
    @CurrentUser() authUser: User
  ): Promise<any> {
    if (authUser.role !== COORDINATOR) {
      return {
        result: false,
        error: "You should be a coordinator for creating a company",
      };
    }

    const bullhornService = new BullhornService();
    await bullhornService.init();
    return await bullhornService.insertCompany(body);
  }

