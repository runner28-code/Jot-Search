import { Dictionary } from "typed-two-way-map";
import config from "../config";
import {
  Job as BullhornJob,
  Company as BullhornCompany,
import { Job as GetroJob, Company as GetroCompany } from "../types/Getro";
import { Category } from "./Category";
import { User } from "./User";

export enum Tables {
  COMPANIES = "Companies",
  JOBS = "Jobs",
  USER = "User",
  CONTACTS = "Contacts",
  LEADS = "Leads",
