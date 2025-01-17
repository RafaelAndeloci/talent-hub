-- CreateEnum
CREATE TYPE "academic_course_types" AS ENUM ('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'TECHNICAL', 'TECHNOLOGIST', 'BACHELOR', 'POSTGRADUATE', 'MASTER', 'DOCTORATE', 'LICENTIATE', 'OTHER');

-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('ONGOING', 'COMPLETED', 'LOCKED', 'INTERRUPTED');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('CLT', 'PJ');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('INTERNSHIP', 'FREELANCER', 'EFFECTIVE', 'TEMPORARY', 'TRAINEE');

-- CreateEnum
CREATE TYPE "PositionLevel" AS ENUM ('INTERN', 'JUNIOR', 'MID_LEVEL', 'SENIOR', 'SPECIALIST', 'COORDINATOR', 'MANAGER', 'DIRECTOR', 'CEO');

-- CreateEnum
CREATE TYPE "WorkloadType" AS ENUM ('FULL_TIME', 'PART_TIME', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "WorkplaceType" AS ENUM ('OFFICE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "Benefit" AS ENUM ('TRANSPORTATION_VOUCHER', 'MEAL_VOUCHER', 'FOOD_VOUCHER', 'HEALTH_INSURANCE', 'DENTAL_PLAN', 'LIFE_INSURANCE', 'DAYCARE_ASSISTANCE', 'EDUCATION_ASSISTANCE', 'HOME_OFFICE_ASSISTANCE', 'GYM_ASSISTANCE', 'FUEL_VOUCHER', 'PSYCHOLOGICAL_ASSISTANCE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SYS_ADMIN', 'CANDIDATE', 'RECRUITER', 'MANAGER');

-- CreateEnum
CREATE TYPE "LanguageProficiency" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE');

-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('HARD', 'SOFT');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('TRAINING_CERTIFICATE', 'EVENT_PARTICIPATION', 'AWARD', 'RECOGNITION', 'ACHIEVEMENT');

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
    "bio" VARCHAR(500),
    "hobbies" VARCHAR(100)[],
    "linkedin_url" VARCHAR(255),
    "github_url" VARCHAR(255),
    "instagram_url" VARCHAR(255),
    "professional_headline" VARCHAR(100),
    "desired_salary" DOUBLE PRECISION,
    "auth_match_enabled" BOOLEAN NOT NULL,
    "desired_workplace_type" "WorkplaceType",
    "desired_workload_type" "WorkloadType",
    "desired_employment_type" "EmploymentType",
    "desired_contract_type" "ContractType",
    "desired_benefits" "Benefit"[],
    "desired_position_level" "PositionLevel",

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_languages" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "language" VARCHAR(100) NOT NULL,
    "written" "LanguageProficiency" NOT NULL,
    "spoken" "LanguageProficiency" NOT NULL,
    "listening" "LanguageProficiency" NOT NULL,
    "reading" "LanguageProficiency" NOT NULL,

    CONSTRAINT "candidate_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_academic_experiences" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "institution_name" VARCHAR(150) NOT NULL,
    "institution_url" VARCHAR(255),
    "type" "academic_course_types" NOT NULL,
    "field_of_study" VARCHAR(100) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "description" VARCHAR(500),
    "status" "AcademicStatus" NOT NULL,
    "graduation_forecast" TIMESTAMP(3),
    "semesters" INTEGER,
    "current_semester" INTEGER,
    "institution_registry" VARCHAR(50),

    CONSTRAINT "candidate_academic_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_academic_experience_projects" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(500),
    "technologies" VARCHAR(100)[],
    "candidate_academic_experience_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "candidate_academic_experience_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_professional_experiences" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "company_name" VARCHAR(150) NOT NULL,
    "company_url" VARCHAR(255),
    "role" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "responsibilities" VARCHAR(100)[],
    "technologies" VARCHAR(100)[],

    CONSTRAINT "candidate_professional_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_skills" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "proficiency" "Proficiency" NOT NULL,
    "type" "SkillType" NOT NULL,

    CONSTRAINT "candidate_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_achievements" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "type" "AchievementType" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(500),
    "date" DATE NOT NULL,
    "certificate_url" VARCHAR(255),

    CONSTRAINT "candidate_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_references" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "relationship" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "position_level" "PositionLevel" NOT NULL,
    "company" VARCHAR(150) NOT NULL,
    "company_url" VARCHAR(255),

    CONSTRAINT "candidate_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_user_id_key" ON "candidates"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_phone_key" ON "candidates"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_languages_candidate_id_language_key" ON "candidate_languages"("candidate_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_skills_candidate_id_name_key" ON "candidate_skills"("candidate_id", "name");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_languages" ADD CONSTRAINT "candidate_languages_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_academic_experiences" ADD CONSTRAINT "candidate_academic_experiences_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_academic_experience_projects" ADD CONSTRAINT "candidate_academic_experience_projects_candidate_academic__fkey" FOREIGN KEY ("candidate_academic_experience_id") REFERENCES "candidate_academic_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_professional_experiences" ADD CONSTRAINT "candidate_professional_experiences_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_achievements" ADD CONSTRAINT "candidate_achievements_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_references" ADD CONSTRAINT "candidate_references_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
