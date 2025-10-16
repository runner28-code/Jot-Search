/*
  Warnings:

  - You are about to drop the column `applcation_method` on the `GetroJobInfo` table. All the data in the column will be lost.
  - The `compensation_public` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discarded` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `liked` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
ALTER TABLE "GetroJobInfo" DROP COLUMN "applcation_method",
ADD COLUMN     "application_method" TEXT,
DROP COLUMN "compensation_public",
ADD COLUMN     "compensation_public" BOOLEAN,
