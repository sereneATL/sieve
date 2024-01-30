/*
  Warnings:

  - You are about to drop the column `user1MatchStatus` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `user2MatchStatus` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "user1MatchStatus",
DROP COLUMN "user2MatchStatus",
ADD COLUMN     "matchStatus" "MatchStatus" NOT NULL DEFAULT 'PENDING';
