/*
  Warnings:
  - The `interviews` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "durationWeeks" INTEGER,
ADD COLUMN     "hoursOfOperation" TEXT,
ADD COLUMN     "hoursPerWeek" INTEGER,
ADD COLUMN     "isInterviewRequired" BOOLEAN,
ADD COLUMN     "isOpen" BOOLEAN,
ADD COLUMN     "isPublic" BOOLEAN,
ADD COLUMN     "markUpPercentage" DOUBLE PRECISION,
ADD COLUMN     "numOpenings" INTEGER,
ADD COLUMN     "payRate" INTEGER,
ADD COLUMN     "publicDescription" TEXT,
