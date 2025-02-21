import { Datasource } from "@prisma/client";
import db from "../src/utils/db";

async function main() {
  try {
    console.log("Seeding...🌱");
    // Some of these are dependent on each other, so we need to run them in order
    await seedCandidates();
    await seedCompanies();
    await seedCategories();
    await seedUsers();
    console.log("Done🎉");
  } catch (err) {
    console.error("Error during seed...❌");
    console.error(err);
    throw err;
  }
}

async function seedJobs() {
  await db.job.createMany({
    data: [
      {
        title: "Senior Software Engineer",
        companyId: (await db.company.findFirst())?.id,

        address1: "123 Job St",
        city: "Tulsa",
        state: "OK",
        zip: "74008",
