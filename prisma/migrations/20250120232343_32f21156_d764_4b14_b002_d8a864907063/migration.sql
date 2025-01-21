/*
  Warnings:

  - You are about to drop the column `auth_match_enabled` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `person` on the `job_application_feedbacks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[application_id,title]` on the table `job_application_feedbacks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accept_third_party_applications` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "auth_match_enabled",
ADD COLUMN     "accept_third_party_applications" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "job_application_feedbacks" DROP COLUMN "person";

-- DropEnum
DROP TYPE "job_application_feedback_persons";

-- CreateIndex
CREATE UNIQUE INDEX "job_application_feedbacks_application_id_title_key" ON "job_application_feedbacks"("application_id", "title");
