CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3),
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "externalID" INTEGER,
    "occupation" TEXT,
    "type" TEXT,
