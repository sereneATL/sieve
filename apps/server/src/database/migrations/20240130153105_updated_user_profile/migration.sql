/*
  Warnings:

  - Added the required column `acousticnessScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `danceabilityScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrumentalnessScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livenessScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speechinessScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valenceScore` to the `MusicPreferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MusicPreferences" ADD COLUMN     "acousticnessScore" INTEGER NOT NULL,
ADD COLUMN     "danceabilityScore" INTEGER NOT NULL,
ADD COLUMN     "energyScore" INTEGER NOT NULL,
ADD COLUMN     "instrumentalnessScore" INTEGER NOT NULL,
ADD COLUMN     "livenessScore" INTEGER NOT NULL,
ADD COLUMN     "speechinessScore" INTEGER NOT NULL,
ADD COLUMN     "valenceScore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "profilePicture" TEXT NOT NULL;
