/*
  Warnings:

  - The `address_country_id` column on the `ClientContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `numEmployees` column on the `ClientContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
ALTER TABLE "ClientContact" DROP COLUMN "address_country_id",
