/*
  Warnings:

  - Made the column `hidden` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER COLUMN "hidden" SET NOT NULL,
ALTER COLUMN "hidden" SET DEFAULT false;
