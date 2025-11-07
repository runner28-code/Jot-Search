-- CreateTable
CREATE TABLE "CompanyCandidateInvites" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyCandidateInvites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyCandidateInvites" ADD CONSTRAINT "CompanyCandidateInvites_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
