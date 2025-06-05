/*
  Warnings:

  - Made the column `hidden` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "getroJobInfoId" TEXT,
ALTER COLUMN "hidden" SET NOT NULL,
ALTER COLUMN "hidden" SET DEFAULT false;

-- CreateTable
CREATE TABLE "GetroJobInfo" (
    "id" TEXT NOT NULL,
    "applcation_method" TEXT,
    "application_path" TEXT,
    "compensation_currency" TEXT,
    "compensation_max" TEXT,
    "compensation_min" TEXT,
    "compensation_public" TEXT,
