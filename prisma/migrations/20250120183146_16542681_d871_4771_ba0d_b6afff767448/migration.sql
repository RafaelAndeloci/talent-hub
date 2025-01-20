-- CreateEnum
CREATE TYPE "JobOpportunityStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED', 'PAUSED');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SELECTED', 'REJECTED', 'WITHDRAWN', 'JOB_OPPORTUNITY_CANCELED');

-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "academic_registration_number" VARCHAR(50),
ADD COLUMN     "grades_point_average" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "companies" (
    "id" VARCHAR(36) NOT NULL,
    "trade_name" VARCHAR(150) NOT NULL,
    "legal_name" VARCHAR(150) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "logo_url" VARCHAR(255),
    "galery_url" VARCHAR(255)[],
    "website_url" VARCHAR(255),
    "phone" VARCHAR(11) NOT NULL,
    "recruiting_email" VARCHAR(150) NOT NULL,
    "address" JSON NOT NULL,
    "about" VARCHAR(500) NOT NULL,
    "instagram_url" VARCHAR(255),
    "linkedin_url" VARCHAR(255),
    "values" VARCHAR(100)[],
    "mission" VARCHAR(500) NOT NULL,
    "vision" VARCHAR(500) NOT NULL,
    "employer_number" INTEGER NOT NULL,
    "foundation_date" DATE NOT NULL,
    "industry" VARCHAR(100) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOpportunityRequiredLanguage" (
    "id" VARCHAR(36) NOT NULL,
    "job_opportunity_id" VARCHAR(36) NOT NULL,
    "language" VARCHAR(100) NOT NULL,
    "written" "LanguageProficiency" NOT NULL,
    "spoken" "LanguageProficiency" NOT NULL,
    "listening" "LanguageProficiency" NOT NULL,
    "reading" "LanguageProficiency" NOT NULL,

    CONSTRAINT "JobOpportunityRequiredLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_opportunities" (
    "id" VARCHAR(36) NOT NULL,
    "company_id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "position_level" "PositionLevel" NOT NULL,
    "workload_type" "WorkloadType" NOT NULL,
    "workplace_type" "WorkplaceType" NOT NULL,
    "employment_type" "EmploymentType" NOT NULL,
    "contract_type" "ContractType" NOT NULL,
    "salary" DOUBLE PRECISION,
    "benefits" "Benefit"[],
    "requirements" VARCHAR(100)[],
    "responsibilities" VARCHAR(100)[],
    "technologies" VARCHAR(100)[],
    "deadline" DATE NOT NULL,
    "auto_match_enabled" BOOLEAN NOT NULL,
    "status" "JobOpportunityStatus" NOT NULL,
    "desired_experience_years" INTEGER,
    "desired_education_level" "academic_course_types",
    "desired_skills" TEXT[],

    CONSTRAINT "job_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "job_opportunity_id" VARCHAR(36) NOT NULL,
    "status" "JobApplicationStatus" NOT NULL,
    "applied_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "company_feedback" VARCHAR(500),
    "candidate_feedback" VARCHAR(500),
    "interview_notes" TEXT,
    "rejection_reason" VARCHAR(255),
    "auto_match" BOOLEAN NOT NULL,
    "match_score" DOUBLE PRECISION,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "JobOpportunityRequiredLanguage_job_opportunity_id_language_key" ON "JobOpportunityRequiredLanguage"("job_opportunity_id", "language");

-- AddForeignKey
ALTER TABLE "JobOpportunityRequiredLanguage" ADD CONSTRAINT "JobOpportunityRequiredLanguage_job_opportunity_id_fkey" FOREIGN KEY ("job_opportunity_id") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_opportunities" ADD CONSTRAINT "job_opportunities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_opportunity_id_fkey" FOREIGN KEY ("job_opportunity_id") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
