/*
  Warnings:

  - You are about to drop the column `externalID` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "externalID",
ADD COLUMN     "externalId" TEXT;

-- CreateTable
CREATE TABLE "ClientContact" (
    "id" TEXT NOT NULL,
    "address_address1" TEXT,
    "address_address2" TEXT,
    "address_city" TEXT,
    "address_state" TEXT,
    "address_zip" TEXT,
    "address_country_id" TEXT,
    "certifications" TEXT,
    "clientCorporation" TEXT,
    "comments" TEXT,
    "dateAdded" TIMESTAMP(3),
    "dateLastModified" TIMESTAMP(3),
    "dateLastVisit" TIMESTAMP(3),
    "description" TEXT,
    "desiredCategories" TEXT,
    "desiredSkills" TEXT,
    "desiredSpecialties" TEXT,
    "division" TEXT,
    "email" TEXT,
    "email2" TEXT,
