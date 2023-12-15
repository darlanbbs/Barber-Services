/*
  Warnings:

  - Added the required column `name` to the `clientsqueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services` to the `clientsqueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientsqueue" ADD COLUMN     "isAwaiting" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "services" TEXT NOT NULL;
