/*
  Warnings:

  - You are about to drop the column `proofOfPayment` on the `rental_forms` table. All the data in the column will be lost.
  - You are about to drop the column `proofOfPayment` on the `sample_test_forms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rental_forms" DROP COLUMN "proofOfPayment",
ADD COLUMN     "paymentProof" TEXT;

-- AlterTable
ALTER TABLE "sample_test_forms" DROP COLUMN "proofOfPayment",
ADD COLUMN     "paymentProof" TEXT;
