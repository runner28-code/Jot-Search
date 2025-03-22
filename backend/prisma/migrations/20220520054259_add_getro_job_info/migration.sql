/*
  Warnings:

  - Made the column `hidden` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "getroJobInfoId" TEXT,
ALTER COLUMN "hidden" SET NOT NULL,

-- CreateTable
CREATE TABLE "GetroJobInfo" (
