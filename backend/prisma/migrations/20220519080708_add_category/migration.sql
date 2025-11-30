-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3),
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "occupation" TEXT,
    "type" TEXT,
    "_score" DOUBLE PRECISION,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
