-- CreateTable
CREATE TABLE "_userSavedJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_userSavedCandidates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userSavedJobs_AB_unique" ON "_userSavedJobs"("A", "B");

