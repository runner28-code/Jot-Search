import db from "./db";

export const saveApplication = async (job: string, candidate: string) => {
  try {
    console.log({ job, candidate });
