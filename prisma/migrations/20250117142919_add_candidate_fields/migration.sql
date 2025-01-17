/*
  Warnings:

  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_userId_fkey";

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "hashed_password" VARCHAR(256) NOT NULL,
    "role" "Role" NOT NULL,
    "profile_picture_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "birth_date" DATE NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "address" JSON NOT NULL,
    "cv_url" VARCHAR(255),
    "linkedin_url" VARCHAR(255),
    "github_url" VARCHAR(255),
    "instagram_url" VARCHAR(255),
    "bio" VARCHAR(500),
    "professional_headline" VARCHAR(100),
    "desired_salary" DOUBLE PRECISION,
    "auth_match_enabled" BOOLEAN NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_user_id_key" ON "candidates"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_phone_key" ON "candidates"("phone");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
