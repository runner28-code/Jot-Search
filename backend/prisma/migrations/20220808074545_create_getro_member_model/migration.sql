-- CreateTable
CREATE TABLE "UserTalentCollection" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER,
    "collection_id" INTEGER,
    "status" TEXT,
    "approved_at" TEXT,
    "approved_by" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,
    "declined_by" TEXT,
    "declined_at" TEXT,
    "cover_letter" TEXT,
    "share_permission" BOOLEAN,
    "vouches_count" INTEGER,
    "questionnaire" TEXT,
    "approved_by_collection" BOOLEAN,
    "source" TEXT,
    "onboarding_reminder_sent_at" TEXT,
    "invited_by" TEXT,
    "verified_by" TEXT,
    "invitation_reminder_sent_at" TEXT,
    "verified_at" TEXT,
    "visibility" TEXT,
    "hide_from_domains" TEXT[],
    "user_deleted" BOOLEAN,
    "is_company_admin" BOOLEAN,
    "is_network_admin" BOOLEAN,
    "is_network_ambassador" BOOLEAN,

    CONSTRAINT "UserTalentCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GetroMember" (
    "id" TEXT NOT NULL,
    "avatar_url" TEXT,
