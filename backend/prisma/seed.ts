import { Datasource } from "@prisma/client";

async function main() {
  try {
    console.log("Seeding...🌱");
    // Some of these are dependent on each other, so we need to run them in order
    await seedCandidates();
