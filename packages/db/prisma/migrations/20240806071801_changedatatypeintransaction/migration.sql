/*
  Warnings:

  - You are about to alter the column `amount` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
