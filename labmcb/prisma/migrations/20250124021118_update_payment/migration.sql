/*
  Warnings:

  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalFormId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_sampleTestFormId_fkey";

-- AlterTable
ALTER TABLE "rental_timelines" ADD COLUMN     "invoiceFile" TEXT,
ADD COLUMN     "paymentProof" TEXT;

-- AlterTable
ALTER TABLE "test_timelines" ADD COLUMN     "invoiceFile" TEXT,
ADD COLUMN     "paymentProof" TEXT;

-- DropTable
DROP TABLE "payments";
