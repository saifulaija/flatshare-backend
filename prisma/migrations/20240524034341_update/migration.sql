/*
  Warnings:

  - Added the required column `space` to the `flats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flats" ADD COLUMN     "space" TEXT NOT NULL;
