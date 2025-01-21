/*
  Warnings:

  - You are about to drop the column `creator_user_id` on the `job_applications` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "job_applications" DROP CONSTRAINT "job_applications_creator_user_id_fkey";

-- AlterTable
ALTER TABLE "job_applications" DROP COLUMN "creator_user_id",
ADD COLUMN     "created_by" VARCHAR(36) NOT NULL,
ADD COLUMN     "updated_by" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
