/*
  Warnings:

  - You are about to drop the column `candidate_academic_experience_id` on the `candidate_academic_experience_projects` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `candidate_academic_experience_projects` table. All the data in the column will be lost.
  - Added the required column `academic_experience_id` to the `candidate_academic_experience_projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `candidate_academic_experience_projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `candidate_academic_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidate_academic_experience_projects" DROP CONSTRAINT "candidate_academic_experience_projects_candidate_academic__fkey";

-- AlterTable
ALTER TABLE "candidate_academic_experience_projects" DROP COLUMN "candidate_academic_experience_id",
DROP COLUMN "title",
ADD COLUMN     "academic_experience_id" VARCHAR(36) NOT NULL,
ADD COLUMN     "name" VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE "candidate_academic_experiences" ADD COLUMN     "name" VARCHAR(150) NOT NULL;

-- AddForeignKey
ALTER TABLE "candidate_academic_experience_projects" ADD CONSTRAINT "candidate_academic_experience_projects_academic_experience_fkey" FOREIGN KEY ("academic_experience_id") REFERENCES "candidate_academic_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
