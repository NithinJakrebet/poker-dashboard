-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "playedOn" TIMESTAMP(3) NOT NULL,
    "totalBuyIn" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalCashOut" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "imbalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "GameStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayer" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "buyIn" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "cashOut" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "rawResult" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "adjustedResult" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "GamePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayer_gameId_playerId_key" ON "GamePlayer"("gameId", "playerId");

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
