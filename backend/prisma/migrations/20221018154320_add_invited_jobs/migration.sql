-- CreateTable
CREATE TABLE "CandidateJobInvites" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateJobInvites_pkey" PRIMARY KEY ("id")
);

