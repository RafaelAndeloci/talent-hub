-- AlterEnum
ALTER TYPE "job_opportunity_statuses" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "job_opportunities" ADD COLUMN     "desired_course" TEXT;
