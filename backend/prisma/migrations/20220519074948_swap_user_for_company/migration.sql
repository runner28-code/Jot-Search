/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_branchId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "annualRevenue" BIGINT,
    "addressId" TEXT,
    "billingAddressId" TEXT,
    "billingContact" TEXT,
    "billingFrequency" TEXT,
    "billingPhone" TEXT,
    "branchId" TEXT,
    "businessSectorList" TEXT[],
    "companyDescription" TEXT,
    "companyURL" TEXT,
    "competitors" TEXT[],
    "culture" TEXT,
    "dateAdded" TIMESTAMP(3),
    "dateFounded" TIMESTAMP(3),
    "dateLastModified" TIMESTAMP(3),
    "departmentId" TEXT,
    "externalID" TEXT,
    "facebookProfileName" TEXT,
    "fax" TEXT,
    "funding" TEXT,
    "industryList" TEXT[],
    "invoiceFormat" TEXT,
    "linkedinProfileName" TEXT,
    "notes" TEXT,
    "numEmployees" INTEGER,
    "numOffices" INTEGER,
    "ownership" TEXT,
    "phone" TEXT,
    "revuenue" TEXT,
    "status" TEXT,
    "taxRate" DOUBLE PRECISION,
    "tickerSymbol" TEXT,
    "trackTitle" TEXT,
    "twitterHandle" TEXT,
