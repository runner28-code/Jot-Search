-- CreateTable
CREATE TABLE "CompanyCandidateInvites" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyCandidateInvites_pkey" PRIMARY KEY ("id")
