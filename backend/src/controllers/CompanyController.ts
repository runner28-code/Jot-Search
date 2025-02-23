import {
  Body,
  Get,
  Post,
  Put,
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
