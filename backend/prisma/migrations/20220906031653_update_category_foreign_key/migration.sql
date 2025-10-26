/*
  Warnings:

  - A unique constraint covering the columns `[externalID]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey

-- CreateIndex
CREATE UNIQUE INDEX "Category_externalID_key" ON "Category"("externalID");
