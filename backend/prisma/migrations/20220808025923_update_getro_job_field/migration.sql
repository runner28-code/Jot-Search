/*
  Warnings:

  - The `employment_types` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `passes_filter` column on the `GetroJobInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ADD COLUMN     "closed_at" TIMESTAMP(3),
