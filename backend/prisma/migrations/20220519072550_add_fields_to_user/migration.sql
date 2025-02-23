-- AlterTable
ALTER TABLE "User" ADD COLUMN     "_score" DOUBLE PRECISION,
ADD COLUMN     "billingContact" TEXT,
ADD COLUMN     "billingPhone" TEXT,
ADD COLUMN     "businessSectorList" TEXT[],
ADD COLUMN     "companyDescription" TEXT,
ADD COLUMN     "companyURL" TEXT,
ADD COLUMN     "competitors" TEXT[],
ADD COLUMN     "culture" TEXT,
