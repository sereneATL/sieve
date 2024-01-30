/*
  Warnings:

  - The values [ALL] on the enum `PersonalityType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PersonalityType_new" AS ENUM ('INTROVERT', 'EXTROVERT', 'AMBIVERT');
ALTER TABLE "UserProfile" ALTER COLUMN "personalityType" TYPE "PersonalityType_new" USING ("personalityType"::text::"PersonalityType_new");
ALTER TYPE "PersonalityType" RENAME TO "PersonalityType_old";
ALTER TYPE "PersonalityType_new" RENAME TO "PersonalityType";
DROP TYPE "PersonalityType_old";
COMMIT;

-- AlterTable
ALTER TABLE "MusicPreferences" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
