/*
  Warnings:

  - You are about to drop the `UserTalentCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GetroMember" DROP CONSTRAINT "GetroMember_userTalentCollectionId_fkey";
