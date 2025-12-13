/*
  Warnings:

  - The `dayRate` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dayRateLow` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hourlyRate` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hourlyRateLow` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `massMailOptOut` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `numCategories` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `numOwners` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salary` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salaryLow` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `timeZoneOffsetEST` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `travelLimit` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `address_country_id` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salary` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salaryLow` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `timeZoneOffsetEST` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hourlyRate` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ethnicity` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "dayRate",
ADD COLUMN     "dayRate" INTEGER,
DROP COLUMN "dayRateLow",
ADD COLUMN     "dayRateLow" INTEGER,
DROP COLUMN "hourlyRate",
ADD COLUMN     "hourlyRate" INTEGER,
DROP COLUMN "hourlyRateLow",
ADD COLUMN     "hourlyRateLow" INTEGER,
DROP COLUMN "massMailOptOut",
ADD COLUMN     "massMailOptOut" BOOLEAN,
DROP COLUMN "numCategories",
ADD COLUMN     "numCategories" INTEGER,
DROP COLUMN "numOwners",
ADD COLUMN     "numOwners" INTEGER,
DROP COLUMN "salary",
ADD COLUMN     "salary" BIGINT,
DROP COLUMN "salaryLow",
ADD COLUMN     "salaryLow" BIGINT,
DROP COLUMN "timeZoneOffsetEST",
ADD COLUMN     "timeZoneOffsetEST" INTEGER,
DROP COLUMN "travelLimit",
ADD COLUMN     "travelLimit" INTEGER,
DROP COLUMN "address_country_id",
ADD COLUMN     "address_country_id" INTEGER;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "salary",
ADD COLUMN     "salary" BIGINT,
DROP COLUMN "salaryLow",
ADD COLUMN     "salaryLow" BIGINT,
DROP COLUMN "timeZoneOffsetEST",
ADD COLUMN     "timeZoneOffsetEST" INTEGER;

-- AlterTable
ADD COLUMN     "hourlyRate" INTEGER,
DROP COLUMN "ethnicity",
