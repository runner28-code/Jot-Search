/*
  Warnings:

  - A unique constraint covering the columns `[externalID]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Category_externalID_key" ON "Category"("externalID");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("externalID") ON DELETE SET NULL ON UPDATE CASCADE;
