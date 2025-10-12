-- AlterTable
ADD COLUMN     "annualRevenue" BIGINT,
ADD COLUMN     "billingAddressId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

