-- CreateTable
CREATE TABLE "UserTalentCollection" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER,
    "collection_id" INTEGER,
    "status" TEXT,
    "approved_at" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,
    "declined_by" TEXT,
    "declined_at" TEXT,
    "cover_letter" TEXT,
