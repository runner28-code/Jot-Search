import { User } from "../types/User";
import { BigQueryService } from "../services/BigQueryService";
import { DATASET_BULLHORN, DATASET_MAIN, Tables } from "../types/Common";
import { genUUID, isExistByCondition, isExistByID } from "./";
import { Candidate } from "../types/Bullhorn";
import { Job } from "../types/Main";
import {
  parseBullhornCandidateToUser,
} from "./parseEntities";
import db from "./db";
import { Candidate as DbCandidate } from "prisma/prisma-client";

