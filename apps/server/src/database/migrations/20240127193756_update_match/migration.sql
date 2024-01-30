/*
  Warnings:

  - You are about to drop the column `content` on the `Match` table. All the data in the column will be lost.
  - Added the required column `matchScore` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1MatchStatus` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2MatchStatus` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "content",
ADD COLUMN     "matchScore" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "user1MatchStatus" "MatchStatus" NOT NULL,
ADD COLUMN     "user2MatchStatus" "MatchStatus" NOT NULL;
