import {
  Body,
  Get,
  Post,
  Put,
  QueryParam,
  JsonController,
  Authorized,
  CurrentUser,
  Patch,
} from "routing-controllers";
import { saveCandidate, getSavedCandidates } from "../services/Candidate";
import { FilterBody } from "../types/Common";
import { User } from "../types/User";
import { COMPANY } from "../utils/constant";

import db from "../utils/db";

import { JobFilter, USER_FILTER } from "../utils/FieldMatch";
import { getSavedJobs, saveJob } from "../utils/MainCrud";
import { clearPassword } from "../utils/password";
import { COORDINATOR } from "../utils/constant";
import { sendEmail, sendJobsToCandidates } from "../services/EmailService";
import { getJobsList } from "../services/Job";
import { normalizeFilters } from "./JobController";
import { Dictionary } from "typed-two-way-map";
import e from "express";

@JsonController("/api/candidate")
export class CandidateController {
  @Authorized()
  @Get("/savedJobs")
  async savedJobs(@QueryParam("candidate") candidate: string) {
