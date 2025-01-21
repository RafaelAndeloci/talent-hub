/*
  Warnings:

  - Added the required column `created_by` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_applications" ADD COLUMN     "created_by" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "job_opportunities" ADD COLUMN     "desired_experience_area" TEXT;
