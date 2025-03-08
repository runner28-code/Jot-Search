import { Dictionary } from "typed-two-way-map";
import config from "../config";
import {
  Job as BullhornJob,
  Company as BullhornCompany,
} from "../types/Bullhorn";
import { Job as GetroJob, Company as GetroCompany } from "../types/Getro";
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
  JOINED_CANDIDATES = "candidates_joined",
  CATEGORIES = "Categories",
}

export const DATASET_BULLHORN = config.bullhornDatasetID || "";
export const DATASET_GETRO = config.getroDatasetID || "";
export const DATASET_MAIN = config.mainDatasetID || "";

// Common
export enum DataSource {
