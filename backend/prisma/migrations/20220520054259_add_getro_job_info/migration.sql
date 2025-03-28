/*
  Warnings:


*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "getroJobInfoId" TEXT,
ALTER COLUMN "hidden" SET NOT NULL,
ALTER COLUMN "hidden" SET DEFAULT false;

-- CreateTable
CREATE TABLE "GetroJobInfo" (
    "id" TEXT NOT NULL,
