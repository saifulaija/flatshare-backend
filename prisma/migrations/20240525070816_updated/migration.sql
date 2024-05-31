/*
  Warnings:

  - You are about to drop the column `additionalInformation` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `termsAndCondition` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `request_flats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "request_flats" DROP CONSTRAINT "request_flats_userId_fkey";

-- DropIndex
DROP INDEX "request_flats_userId_key";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "additionalInformation",
DROP COLUMN "address",
DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "profession",
DROP COLUMN "termsAndCondition",
DROP COLUMN "userName",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "request_flats" DROP COLUMN "userId",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
