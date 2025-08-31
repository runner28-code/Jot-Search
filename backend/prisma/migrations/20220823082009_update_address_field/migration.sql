/*
  Warnings:


*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "countryCode" DROP NOT NULL,
ALTER COLUMN "countryCode" SET DATA TYPE TEXT;
