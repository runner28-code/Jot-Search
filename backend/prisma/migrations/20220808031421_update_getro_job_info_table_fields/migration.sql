/*
  Warnings:

  - The `compensation_public` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discarded` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `liked` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GetroJobInfo" DROP COLUMN "applcation_method",
ADD COLUMN     "application_method" TEXT,
