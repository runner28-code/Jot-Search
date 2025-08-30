-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "clientContactID" TEXT,
ADD COLUMN     "clientCorporationID" TEXT,
ADD COLUMN     "dateAdded" TIMESTAMP(3),
ADD COLUMN     "dateClosed" TIMESTAMP(3),
ADD COLUMN     "dateLastExported" TIMESTAMP(3),
