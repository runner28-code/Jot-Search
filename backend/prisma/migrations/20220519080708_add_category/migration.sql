-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3),
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
