import { User } from "../types/User";
import { BigQueryService } from "../services/BigQueryService";
import { genUUID, isExistByCondition, isExistByID } from "./";
import { Candidate } from "../types/Bullhorn";
import { Job } from "../types/Main";
import {
  parseBullhornCandidateToUser,
  parseBullhornJobToMain,
} from "./parseEntities";
import db from "./db";
import { Candidate as DbCandidate } from "prisma/prisma-client";
