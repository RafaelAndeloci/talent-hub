/*
  Warnings:

  - You are about to drop the column `foundation_date` on the `companies` table. All the data in the column will be lost.
  - Added the required column `foundation_year` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "foundation_date",
ADD COLUMN     "foundation_year" INTEGER NOT NULL;
