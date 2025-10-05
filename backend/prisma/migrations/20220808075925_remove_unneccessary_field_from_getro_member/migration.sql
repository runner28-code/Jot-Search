/*
  Warnings:

  - You are about to drop the column `userTalentCollectionId` on the `GetroMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GetroMember" DROP CONSTRAINT "GetroMember_userTalentCollectionId_fkey";

-- AlterTable
