import { DATASET_BULLHORN, DATASET_GETRO, DATASET_MAIN } from "../types/Common";
import {
  Job,
  ALLOWED_JOB_KEYS,
  JobKey,
  ALLOWED_JOB_KEYS_TO_UPDATE,
} from "../types/Job";
import db from "../utils/db";

export const createJob = async (job: Job) => {
  try {
    const jobError = validateJob(job);
    if (jobError) {
      throw new Error(jobError);
