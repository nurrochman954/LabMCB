/*
  Warnings:

  - Added the required column `testInstanceName` to the `sample_test_forms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SamplePreparation" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "rental_forms" ADD COLUMN     "rentalRequestNumber" TEXT;

-- AlterTable
ALTER TABLE "sample_test_forms" ADD COLUMN     "samplePreparation" "SamplePreparation",
ADD COLUMN     "sampleRequestNumber" TEXT,
ADD COLUMN     "testInstanceName" TEXT NOT NULL;
