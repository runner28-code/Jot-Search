import { Dictionary } from "typed-two-way-map";
import config from "../config";
import {
  Job as BullhornJob,
  Company as BullhornCompany,
} from "../types/Bullhorn";
import { Category } from "./Category";
import { User } from "./User";

export enum Tables {
  COMPANIES = "Companies",
  JOBS = "Jobs",
  USER = "User",
  CONTACTS = "Contacts",
  LEADS = "Leads",
  CANDIDATES = "Candidates",
  APPLICATIONS = "Applications",
  SAVEDJOBS = "SavedJobs",
  SAVED_COMPANIES = "SavedCompanies",
  SAVED_CANDIDATES = "SavedCandidates",
  JOINED_COMPANIES = "companies_joined",
  JOINED_CANDIDATES = "candidates_joined",
  CATEGORIES = "Categories",
}

export const DATASET_BULLHORN = config.bullhornDatasetID || "";
export const DATASET_GETRO = config.getroDatasetID || "";
export const DATASET_MAIN = config.mainDatasetID || "";

// Common
export enum DataSource {
  BULLHORN = "bullhorn",
  GETRO = "getro",
  UNKNOWN = "unknown",
}

export type DataSources = "bullhorn" | "getro" | "main" | "all";

export type Operator = "AND" | "OR";

export type FilterOption = {
  key: string;
  value: string;
};

export type AdvancedFilterOption = {
  key: string;
  value: string | string[];
  operator?: Operator;
};

export type FilterBody = {
  filters?: any;
  fields: any;
  page: number;
  count: number;
  operator?: Operator;
};

type CountFilterResponse = {
  total?: number;
  message?: any;
};

// Job Types
export type Job = BullhornJob | GetroJob;
export type JobSearchByID = {
  job?: Job;
  source: DataSource;
