/*
  Warnings:

  - You are about to drop the column `lastname` on the `Candidate` table. All the data in the column will be lost.
  - The `ethnicity` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `experience` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recentClientList` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
DROP COLUMN "ethnicity",
