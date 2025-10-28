/*
  Warnings:

  - You are about to drop the column `expertise` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expertise",
ADD COLUMN     "expertiseId" INTEGER;
