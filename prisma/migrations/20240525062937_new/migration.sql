/*
  Warnings:

  - Added the required column `additionalInformation` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAndCondition` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "additionalInformation" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL,
ADD COLUMN     "termsAndCondition" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "request_flats" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "termsAndCondition" TEXT NOT NULL,
    "flattId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_flats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "request_flats_userId_key" ON "request_flats"("userId");

-- AddForeignKey
ALTER TABLE "request_flats" ADD CONSTRAINT "request_flats_flattId_fkey" FOREIGN KEY ("flattId") REFERENCES "flats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_flats" ADD CONSTRAINT "request_flats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
