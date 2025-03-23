import { Datasource } from "@prisma/client";
import db from "../src/utils/db";

async function main() {
  try {
    console.log("Seeding...🌱");
    // Some of these are dependent on each other, so we need to run them in order
    await seedCandidates();
    await seedCompanies();
    await seedCategories();
    await seedJobs();
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
        salary: 160000,
        employmentType: "fulltime",
        onSite: "On-Site",
        description: "Come join our rockstar team for good money and team",
        datasource: Datasource.main as any,
        status: "active",
        categoryId: (await db.category.findFirst({
          where: { name: "Software & Engineering" },
        }))!.id,
      },
      {
        title: "Junior Software Engineer",
        companyId: (await db.company.findFirst())?.id,

        address1: "123 Job St",
        city: "Tulsa",
        state: "OK",
        zip: "74008",
        salary: 80000,
        employmentType: "fulltime",
        onSite: "Hybrid",
        description: "Come join our rockstar team for good money and learning",
        datasource: Datasource.bullhorn as any,
        status: "active",
        categoryId: (await db.category.findFirst({
          where: { name: "Software & Engineering" },
        }))!.id,
    ],
