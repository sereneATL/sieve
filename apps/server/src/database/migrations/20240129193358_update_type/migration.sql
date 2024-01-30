/*
  Warnings:

  - Changed the type of `sameMusicTypePreference` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "sameMusicTypePreference",
ADD COLUMN     "sameMusicTypePreference" INTEGER NOT NULL;
