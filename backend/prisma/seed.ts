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
      },
    ],
  });
}

async function seedCandidates() {
  await db.candidate.createMany({
    data: [
      {
        address: "123 Main St",
        address_address1: "123 Main St",
        occupation: "Programmer",
        address_city: "Tulsa",
        address_state: "OK",
        address_zip: "74008",
        description: "Great candidate for everything",
        companyName: "Eddy's Everything",
        companyURL: "eddyseverything.com",
        firstName: "John",
        lastName: "Smith",
        phone: "123-456-7891",
        email: "jsmithers@gmail.com",
        comments: "He does everything!",
      },
      {
        address: "124 Main St",
        address_address1: "124 Main St",
        occupation: "None",
        address_city: "Tulsa",
        address_state: "OK",
        address_zip: "74008",
        description: "Ehh...",
        companyName: "Nowhere",
        companyURL: "nowhere.com",
        firstName: "Bob",
        lastName: "Tester",
        phone: "987-654-3210",
        email: "bobtesting@gmail.com",
        comments: "He does nothing...",
      },
    ],
  });
}

async function seedCategories() {
  await db.category.createMany({
    data: [
      {
        name: "Finance",
        enabled: true,
        externalID: 2000031,
      },
      {
        name: "Marketing",
        enabled: true,
        externalID: 2000026,
      },
      {
