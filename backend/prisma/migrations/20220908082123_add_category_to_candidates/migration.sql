-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("externalID") ON DELETE SET NULL ON UPDATE CASCADE;
