import { Datasource } from "@prisma/client";
import db from "../src/utils/db";

  try {
    console.log("Seeding...🌱");
    // Some of these are dependent on each other, so we need to run them in order
    await seedCandidates();
    await seedCompanies();
