import { User } from "../types/User";
import { DATASET_BULLHORN, DATASET_MAIN, Tables } from "../types/Common";
import { genUUID, isExistByCondition, isExistByID } from "./";
import { Candidate } from "../types/Bullhorn";
import { Job } from "../types/Main";
import {
  parseBullhornCandidateToUser,
  parseBullhornJobToMain,
