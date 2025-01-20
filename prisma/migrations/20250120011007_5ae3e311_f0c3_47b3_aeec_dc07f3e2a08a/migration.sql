-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_reset_token" VARCHAR(256),
ADD COLUMN     "password_reset_token_expires" TIMESTAMPTZ;
