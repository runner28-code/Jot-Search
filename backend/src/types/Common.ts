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
