/*
  Warnings:

  - The `numEmployees` column on the `ClientContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClientContact" DROP COLUMN "address_country_id",
ADD COLUMN     "address_country_id" INTEGER,
