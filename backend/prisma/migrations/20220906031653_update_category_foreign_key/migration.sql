/*
  Warnings:


*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Category_externalID_key" ON "Category"("externalID");

-- AddForeignKey
