import axios from "axios";
import config from "../config";
import queryString from "query-string";
import {
  saveCandidates,
  saveClientContacts,
  saveCompanies,
  saveBullhornJobs,
  saveLeads,
} from "../utils/BullhornCrud";
import fs from "fs";
import { checkForJobFilter, sleep } from "../utils";
import db from "../utils/db";
import { User } from "../types/User";
import { Job } from "prisma/prisma-client";
import { sendEmail } from "./EmailService";
import { JOB_FIELDS } from "../utils/constant";

export class BullhornService {
  public static client: BullhornService | null = null;
