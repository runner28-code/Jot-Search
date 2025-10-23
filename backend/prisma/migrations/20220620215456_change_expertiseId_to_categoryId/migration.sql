/*
  Warnings:


*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_expertiseId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "expertiseId",
ADD COLUMN     "categoryId" INTEGER;
