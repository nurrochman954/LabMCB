/*
  Warnings:

  - You are about to drop the column `paymentProof` on the `sample_tests` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `sample_tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sample_tests" DROP COLUMN "paymentProof",
DROP COLUMN "paymentStatus";
