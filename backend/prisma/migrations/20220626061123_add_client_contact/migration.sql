/*
  Warnings:

  - You are about to drop the column `externalID` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "externalID",

-- CreateTable
CREATE TABLE "ClientContact" (
    "id" TEXT NOT NULL,
    "address_address1" TEXT,
