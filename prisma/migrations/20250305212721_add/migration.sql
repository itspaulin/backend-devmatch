/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `github_profile` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
DROP COLUMN "github_profile",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "githubProfile" TEXT,
ALTER COLUMN "updated_at" DROP NOT NULL;
