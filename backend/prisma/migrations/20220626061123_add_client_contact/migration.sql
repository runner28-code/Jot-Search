/*
  Warnings:

  - You are about to drop the column `externalID` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "externalID",
ADD COLUMN     "externalId" TEXT;

-- CreateTable
CREATE TABLE "ClientContact" (
    "id" TEXT NOT NULL,
    "address_address1" TEXT,
    "address_address2" TEXT,
    "address_city" TEXT,
    "address_state" TEXT,
