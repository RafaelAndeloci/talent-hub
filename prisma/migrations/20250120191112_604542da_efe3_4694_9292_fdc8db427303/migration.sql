/*
  Warnings:

  - The values [WITHDRAWN,JOB_OPPORTUNITY_CANCELED] on the enum `JobApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `JobOpportunityStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `academic_registration_number` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `grades_point_average` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `auto_match` on the `job_applications` table. All the data in the column will be lost.
  - You are about to drop the column `match_score` on the `job_applications` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobApplicationStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'SELECTED', 'REJECTED', 'CANCELED_BY_CANDIDATE', 'CANCELED_BY_COMPANY');
ALTER TABLE "job_applications" ALTER COLUMN "status" TYPE "JobApplicationStatus_new" USING ("status"::text::"JobApplicationStatus_new");
ALTER TYPE "JobApplicationStatus" RENAME TO "JobApplicationStatus_old";
ALTER TYPE "JobApplicationStatus_new" RENAME TO "JobApplicationStatus";
DROP TYPE "JobApplicationStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobOpportunityStatus_new" AS ENUM ('OPEN', 'CLOSED', 'PAUSED');
ALTER TABLE "job_opportunities" ALTER COLUMN "status" TYPE "JobOpportunityStatus_new" USING ("status"::text::"JobOpportunityStatus_new");
ALTER TYPE "JobOpportunityStatus" RENAME TO "JobOpportunityStatus_old";
ALTER TYPE "JobOpportunityStatus_new" RENAME TO "JobOpportunityStatus";
DROP TYPE "JobOpportunityStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "academic_registration_number",
DROP COLUMN "grades_point_average";

-- AlterTable
ALTER TABLE "job_applications" DROP COLUMN "auto_match",
DROP COLUMN "match_score";
