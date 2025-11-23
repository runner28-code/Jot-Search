/*
  Warnings:


*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expertise",
ADD COLUMN     "expertiseId" INTEGER;

-- AddForeignKey
