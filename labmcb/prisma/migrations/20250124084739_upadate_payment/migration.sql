/*
  Warnings:

  - You are about to drop the column `invoiceFile` on the `rental_timelines` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProof` on the `rental_timelines` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceFile` on the `test_timelines` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProof` on the `test_timelines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rental_forms" ADD COLUMN     "invoiceFile" TEXT,
ADD COLUMN     "proofOfPayment" TEXT;

-- AlterTable
ALTER TABLE "rental_timelines" DROP COLUMN "invoiceFile",
DROP COLUMN "paymentProof";

-- AlterTable
ALTER TABLE "sample_test_forms" ADD COLUMN     "invoiceFile" TEXT,
ADD COLUMN     "proofOfPayment" TEXT;

-- AlterTable
ALTER TABLE "test_timelines" DROP COLUMN "invoiceFile",
DROP COLUMN "paymentProof";
