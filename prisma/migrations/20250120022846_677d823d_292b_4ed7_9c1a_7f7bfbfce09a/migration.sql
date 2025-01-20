/*
  Warnings:

  - You are about to drop the column `role` on the `candidate_professional_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `candidate_references` table. All the data in the column will be lost.
  - Added the required column `position` to the `candidate_professional_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_level` to the `candidate_professional_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_professional_experiences" DROP COLUMN "role",
ADD COLUMN     "position" VARCHAR(100) NOT NULL,
ADD COLUMN     "position_level" "PositionLevel" NOT NULL;

-- AlterTable
ALTER TABLE "candidate_references" DROP COLUMN "role";
