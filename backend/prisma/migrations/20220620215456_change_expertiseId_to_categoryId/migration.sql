/*
  Warnings:

  - You are about to drop the column `expertiseId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey

-- AlterTable
ALTER TABLE "User" DROP COLUMN "expertiseId",
ADD COLUMN     "categoryId" INTEGER;
