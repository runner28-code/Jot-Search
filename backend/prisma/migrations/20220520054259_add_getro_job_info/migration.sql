/*
  Warnings:

  - Made the column `hidden` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
ALTER TABLE "Job" ADD COLUMN     "getroJobInfoId" TEXT,
