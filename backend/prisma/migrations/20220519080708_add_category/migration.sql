-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3),
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "externalID" INTEGER,
    "occupation" TEXT,
    "type" TEXT,
    "_score" DOUBLE PRECISION,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
