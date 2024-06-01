/*
  Warnings:

  - Added the required column `bookingId` to the `request_flats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "request_flats" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "request_flats" ADD CONSTRAINT "request_flats_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
