/*
  Warnings:

  - The `desiredLocations` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employmentPreference` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `address_country_id` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `clientCorporation` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `notes` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `numEmployees` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `owner` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "desiredLocations",
ADD COLUMN     "desiredLocations" TEXT[],
DROP COLUMN "employmentPreference",

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "address_country_id",
ADD COLUMN     "address_country_id" INTEGER,
DROP COLUMN "category",
ADD COLUMN     "category" JSONB,
DROP COLUMN "clientCorporation",
ADD COLUMN     "clientCorporation" JSONB,
DROP COLUMN "notes",
ADD COLUMN     "notes" JSONB,
