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
