-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departmentId" TEXT;

CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

