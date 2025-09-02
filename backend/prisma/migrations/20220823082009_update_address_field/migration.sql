/*
  Warnings:

  - The `degreeList` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "countryCode" DROP NOT NULL,
ALTER COLUMN "countryCode" SET DATA TYPE TEXT;
