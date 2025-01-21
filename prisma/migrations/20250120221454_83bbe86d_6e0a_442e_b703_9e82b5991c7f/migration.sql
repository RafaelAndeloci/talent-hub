/*
  Warnings:

  - You are about to drop the column `created_by` on the `job_applications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidate_id,job_opportunity_id]` on the table `job_applications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_user_id` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_applications" DROP COLUMN "created_by",
ADD COLUMN     "creator_user_id" VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "job_applications_candidate_id_job_opportunity_id_key" ON "job_applications"("candidate_id", "job_opportunity_id");

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
