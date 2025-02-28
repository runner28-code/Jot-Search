/*
  Warnings:


*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "externalID",
ADD COLUMN     "externalId" TEXT;

-- CreateTable
CREATE TABLE "ClientContact" (
