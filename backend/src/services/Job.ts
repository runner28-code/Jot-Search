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
    }

    const sanitizedJob = sanitizeJob(job) as any;

    const newJob = await db.job.create({
      data: {
        ...sanitizedJob,
        datasource: sanitizedJob?.datasource as any,
      },
    });

    return {
      result: true,
      data: newJob,
