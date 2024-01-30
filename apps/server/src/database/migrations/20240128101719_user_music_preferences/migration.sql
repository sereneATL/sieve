/*
  Warnings:

  - You are about to drop the column `musicalAura` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'ALL';

-- AlterEnum
ALTER TYPE "PersonalityType" ADD VALUE 'ALL';

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "musicalAura";

-- CreateTable
CREATE TABLE "MusicPreferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "topGenres" TEXT[],
    "topArtists" TEXT[],
    "topTracksString" TEXT[],
    "topTracksId" TEXT[],

    CONSTRAINT "MusicPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MusicPreferences_userId_key" ON "MusicPreferences"("userId");

-- AddForeignKey
ALTER TABLE "MusicPreferences" ADD CONSTRAINT "MusicPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
