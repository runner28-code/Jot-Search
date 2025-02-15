import { Datasource } from "@prisma/client";
import db from "../src/utils/db";

async function main() {
  try {
    console.log("Seeding...🌱");
    // Some of these are dependent on each other, so we need to run them in order
    await seedCandidates();
    await seedCompanies();
    await seedJobs();
    await seedUsers();
    console.log("Done🎉");
  } catch (err) {
    console.error("Error during seed...❌");
    console.error(err);
