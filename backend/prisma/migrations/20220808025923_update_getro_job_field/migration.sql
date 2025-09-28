/*
  Warnings:

  - The `employment_types` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `passes_filter` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GetroJobInfo" ADD COLUMN     "bounty" TEXT,
ADD COLUMN     "deactivated_at" TIMESTAMP(3),
