/*
  Warnings:

  - You are about to drop the column `complaintCreatedAt` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `complaintReferenceId` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `complaintType` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `paymentCreatedAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentUpdatedAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `referenceType` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `rentalId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `sampleTestId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `rental_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rentals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample_tests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RentalStatus" ADD VALUE 'UNPAID';
ALTER TYPE "RentalStatus" ADD VALUE 'WAITING_VERIFICATION';
ALTER TYPE "RentalStatus" ADD VALUE 'PAID';
ALTER TYPE "RentalStatus" ADD VALUE 'REJECTED_PAYMENT';
ALTER TYPE "RentalStatus" ADD VALUE 'DELIVERY';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TestStatus" ADD VALUE 'UNPAID';
ALTER TYPE "TestStatus" ADD VALUE 'WAITING_VERIFICATION';
ALTER TYPE "TestStatus" ADD VALUE 'PAID';
ALTER TYPE "TestStatus" ADD VALUE 'REJECTED_PAYMENT';

-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_userId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_sampleTestId_fkey";

-- DropForeignKey
ALTER TABLE "rental_items" DROP CONSTRAINT "rental_items_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "rental_timelines" DROP CONSTRAINT "rental_timelines_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_userId_fkey";

-- DropForeignKey
ALTER TABLE "sample_tests" DROP CONSTRAINT "sample_tests_userId_fkey";

-- DropForeignKey
ALTER TABLE "test_timelines" DROP CONSTRAINT "test_timelines_testId_fkey";

-- AlterTable
ALTER TABLE "complaints" DROP COLUMN "complaintCreatedAt",
DROP COLUMN "complaintReferenceId",
DROP COLUMN "complaintType",
DROP COLUMN "userId",
ADD COLUMN     "complaintCreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rentalFormId" INTEGER,
ADD COLUMN     "sampleTestFormId" INTEGER;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentCreatedAt",
DROP COLUMN "paymentStatus",
DROP COLUMN "paymentUpdatedAt",
DROP COLUMN "referenceId",
DROP COLUMN "referenceType",
DROP COLUMN "rentalId",
DROP COLUMN "sampleTestId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rentalFormId" INTEGER,
ADD COLUMN     "sampleTestFormId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "rental_items";

-- DropTable
DROP TABLE "rentals";

-- DropTable
DROP TABLE "sample_tests";

-- DropEnum
DROP TYPE "ComplaintType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "ReferenceType";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "sample_test_forms" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "testEmail" TEXT NOT NULL,
    "testPhone" TEXT NOT NULL,
    "testAddress" TEXT NOT NULL,
    "analysisTypes" "AnalysisType"[],
    "sampleName" TEXT NOT NULL,
    "sampleType" "SampleType" NOT NULL,
    "sampleQuantity" INTEGER NOT NULL,
    "testDescription" TEXT,
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "coverLetter" TEXT,
    "resultFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sample_test_forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_forms" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rentalName" TEXT NOT NULL,
    "rentalEmail" TEXT NOT NULL,
    "rentalPhone" TEXT NOT NULL,
    "rentalAddress" TEXT NOT NULL,
    "rentalInstance" TEXT NOT NULL,
    "equipment" "RentalEquipment"[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "agreementFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rental_forms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sample_test_forms" ADD CONSTRAINT "sample_test_forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_forms" ADD CONSTRAINT "rental_forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalFormId_fkey" FOREIGN KEY ("rentalFormId") REFERENCES "rental_forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_sampleTestFormId_fkey" FOREIGN KEY ("sampleTestFormId") REFERENCES "sample_test_forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_rentalFormId_fkey" FOREIGN KEY ("rentalFormId") REFERENCES "rental_forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_sampleTestFormId_fkey" FOREIGN KEY ("sampleTestFormId") REFERENCES "sample_test_forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_timelines" ADD CONSTRAINT "test_timelines_testId_fkey" FOREIGN KEY ("testId") REFERENCES "sample_test_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_timelines" ADD CONSTRAINT "rental_timelines_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
