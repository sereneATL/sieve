/*
  Warnings:

  - Added the required column `genderPreference` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sameMusicTypePreference` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samePersonalityPreference` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "genderPreference" "Gender" NOT NULL,
ADD COLUMN     "sameMusicTypePreference" BOOLEAN NOT NULL,
ADD COLUMN     "samePersonalityPreference" BOOLEAN NOT NULL;
