/*
  Warnings:

  - You are about to drop the column `candidate_feedback` on the `job_applications` table. All the data in the column will be lost.
  - You are about to drop the column `company_feedback` on the `job_applications` table. All the data in the column will be lost.
  - The `interview_notes` column on the `job_applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "job_application_feedback_persons" AS ENUM ('RECRUITER', 'CANDIDATE', 'INTERVIEWER', 'OTHER');

-- AlterTable
ALTER TABLE "job_applications" DROP COLUMN "candidate_feedback",
DROP COLUMN "company_feedback",
ADD COLUMN     "feedbacks" JSON[],
DROP COLUMN "interview_notes",
ADD COLUMN     "interview_notes" TEXT[];

-- CreateTable
CREATE TABLE "job_application_feedbacks" (
    "id" VARCHAR(36) NOT NULL,
    "application_id" VARCHAR(36) NOT NULL,
    "person" "job_application_feedback_persons" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by" VARCHAR(36) NOT NULL,

    CONSTRAINT "job_application_feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_application_feedbacks" ADD CONSTRAINT "job_application_feedbacks_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "job_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_application_feedbacks" ADD CONSTRAINT "job_application_feedbacks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
