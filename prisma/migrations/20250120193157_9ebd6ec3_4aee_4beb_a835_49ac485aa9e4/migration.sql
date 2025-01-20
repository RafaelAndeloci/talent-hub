/*
  Warnings:

  - The `desired_workplace_type` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desired_workload_type` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desired_employment_type` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desired_contract_type` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desired_benefits` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desired_position_level` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `benefits` column on the `job_opportunities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `JobOpportunityRequiredLanguage` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `candidate_academic_experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `candidate_achievements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `written` on the `candidate_languages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `spoken` on the `candidate_languages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `listening` on the `candidate_languages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reading` on the `candidate_languages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position_level` on the `candidate_professional_experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position_level` on the `candidate_references` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `candidate_skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `job_applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position_level` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workload_type` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workplace_type` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `employment_type` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contract_type` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `job_opportunities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "academic_statuses" AS ENUM ('ONGOING', 'COMPLETED', 'LOCKED', 'INTERRUPTED');

-- CreateEnum
CREATE TYPE "contract_types" AS ENUM ('CLT', 'PJ');

-- CreateEnum
CREATE TYPE "employment_types" AS ENUM ('INTERNSHIP', 'FREELANCER', 'EFFECTIVE', 'TEMPORARY', 'TRAINEE');

-- CreateEnum
CREATE TYPE "position_levels" AS ENUM ('INTERN', 'JUNIOR', 'MID_LEVEL', 'SENIOR', 'SPECIALIST', 'COORDINATOR', 'MANAGER', 'DIRECTOR', 'CEO');

-- CreateEnum
CREATE TYPE "workload_types" AS ENUM ('FULL_TIME', 'PART_TIME', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "workplace_types" AS ENUM ('OFFICE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "benefits" AS ENUM ('TRANSPORTATION_VOUCHER', 'MEAL_VOUCHER', 'FOOD_VOUCHER', 'HEALTH_INSURANCE', 'DENTAL_PLAN', 'LIFE_INSURANCE', 'DAYCARE_ASSISTANCE', 'EDUCATION_ASSISTANCE', 'HOME_OFFICE_ASSISTANCE', 'GYM_ASSISTANCE', 'FUEL_VOUCHER', 'PSYCHOLOGICAL_ASSISTANCE');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('SYS_ADMIN', 'CANDIDATE', 'RECRUITER', 'MANAGER');

-- CreateEnum
CREATE TYPE "language_proficiencies" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE');

-- CreateEnum
CREATE TYPE "skill_types" AS ENUM ('HARD', 'SOFT');

-- CreateEnum
CREATE TYPE "achievement_types" AS ENUM ('TRAINING_CERTIFICATE', 'EVENT_PARTICIPATION', 'AWARD', 'RECOGNITION', 'ACHIEVEMENT');

-- CreateEnum
CREATE TYPE "job_opportunity_statuses" AS ENUM ('OPEN', 'CLOSED', 'PAUSED');

-- CreateEnum
CREATE TYPE "job_application_statuses" AS ENUM ('PENDING', 'IN_PROGRESS', 'SELECTED', 'REJECTED', 'CANCELED_BY_CANDIDATE', 'CANCELED_BY_COMPANY');

-- DropForeignKey
ALTER TABLE "JobOpportunityRequiredLanguage" DROP CONSTRAINT "JobOpportunityRequiredLanguage_job_opportunity_id_fkey";

-- AlterTable
ALTER TABLE "candidate_academic_experiences" DROP COLUMN "status",
ADD COLUMN     "status" "academic_statuses" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_achievements" DROP COLUMN "type",
ADD COLUMN     "type" "achievement_types" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_languages" DROP COLUMN "written",
ADD COLUMN     "written" "language_proficiencies" NOT NULL,
DROP COLUMN "spoken",
ADD COLUMN     "spoken" "language_proficiencies" NOT NULL,
DROP COLUMN "listening",
ADD COLUMN     "listening" "language_proficiencies" NOT NULL,
DROP COLUMN "reading",
ADD COLUMN     "reading" "language_proficiencies" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_professional_experiences" DROP COLUMN "position_level",
ADD COLUMN     "position_level" "position_levels" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_references" DROP COLUMN "position_level",
ADD COLUMN     "position_level" "position_levels" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_skills" DROP COLUMN "type",
ADD COLUMN     "type" "skill_types" NOT NULL;

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "desired_workplace_type",
ADD COLUMN     "desired_workplace_type" "workplace_types",
DROP COLUMN "desired_workload_type",
ADD COLUMN     "desired_workload_type" "workload_types",
DROP COLUMN "desired_employment_type",
ADD COLUMN     "desired_employment_type" "employment_types",
DROP COLUMN "desired_contract_type",
ADD COLUMN     "desired_contract_type" "contract_types",
DROP COLUMN "desired_benefits",
ADD COLUMN     "desired_benefits" "benefits"[],
DROP COLUMN "desired_position_level",
ADD COLUMN     "desired_position_level" "position_levels";

-- AlterTable
ALTER TABLE "job_applications" DROP COLUMN "status",
ADD COLUMN     "status" "job_application_statuses" NOT NULL;

-- AlterTable
ALTER TABLE "job_opportunities" DROP COLUMN "position_level",
ADD COLUMN     "position_level" "position_levels" NOT NULL,
DROP COLUMN "workload_type",
ADD COLUMN     "workload_type" "workload_types" NOT NULL,
DROP COLUMN "workplace_type",
ADD COLUMN     "workplace_type" "workplace_types" NOT NULL,
DROP COLUMN "employment_type",
ADD COLUMN     "employment_type" "employment_types" NOT NULL,
DROP COLUMN "contract_type",
ADD COLUMN     "contract_type" "contract_types" NOT NULL,
DROP COLUMN "benefits",
ADD COLUMN     "benefits" "benefits"[],
DROP COLUMN "status",
ADD COLUMN     "status" "job_opportunity_statuses" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "roles" NOT NULL;

-- DropTable
DROP TABLE "JobOpportunityRequiredLanguage";

-- DropEnum
DROP TYPE "AcademicStatus";

-- DropEnum
DROP TYPE "AchievementType";

-- DropEnum
DROP TYPE "Benefit";

-- DropEnum
DROP TYPE "ContractType";

-- DropEnum
DROP TYPE "EmploymentType";

-- DropEnum
DROP TYPE "JobApplicationStatus";

-- DropEnum
DROP TYPE "JobOpportunityStatus";

-- DropEnum
DROP TYPE "LanguageProficiency";

-- DropEnum
DROP TYPE "PositionLevel";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SkillType";

-- DropEnum
DROP TYPE "WorkloadType";

-- DropEnum
DROP TYPE "WorkplaceType";

-- CreateTable
CREATE TABLE "job_opportunity_desired_languages" (
    "id" VARCHAR(36) NOT NULL,
    "job_opportunity_id" VARCHAR(36) NOT NULL,
    "language" VARCHAR(100) NOT NULL,
    "written" "language_proficiencies" NOT NULL,
    "spoken" "language_proficiencies" NOT NULL,
    "listening" "language_proficiencies" NOT NULL,
    "reading" "language_proficiencies" NOT NULL,

    CONSTRAINT "job_opportunity_desired_languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_opportunity_desired_languages_job_opportunity_id_langua_key" ON "job_opportunity_desired_languages"("job_opportunity_id", "language");

-- AddForeignKey
ALTER TABLE "job_opportunity_desired_languages" ADD CONSTRAINT "job_opportunity_desired_languages_job_opportunity_id_fkey" FOREIGN KEY ("job_opportunity_id") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
