-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SampleType" AS ENUM ('LIQUID', 'SOLID', 'PASTE', 'GEL', 'GAS');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('SUBMITTED', 'REVIEWING', 'APPROVED', 'TESTING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('SELF', 'LAB_DELIVERY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'WAITING_VERIFICATION', 'PAID', 'REJECTED');

-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('SUBMITTED', 'REVIEWING', 'APPROVED', 'IN_USE', 'RETURNED');

-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('RENTAL', 'SAMPLE_TEST');

-- CreateEnum
CREATE TYPE "ComplaintType" AS ENUM ('RENTAL', 'SAMPLE_TEST');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample_tests" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "sampleName" TEXT NOT NULL,
    "sampleType" "SampleType" NOT NULL,
    "testDescription" TEXT,
    "status" "TestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "paymentProof" TEXT,
    "coverLetter" TEXT,
    "resultFile" TEXT,
    "sampleTestCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sample_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "rentalStatus" "RentalStatus" NOT NULL DEFAULT 'SUBMITTED',
    "quantity" INTEGER NOT NULL,
    "agreementFile" TEXT,
    "rentalCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "referenceType" "ReferenceType" NOT NULL,
    "referenceId" INTEGER NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "invoiceFile" TEXT,
    "paymentProof" TEXT,
    "paymentDueDate" TIMESTAMP(3) NOT NULL,
    "paymentCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "complaintReferenceId" INTEGER NOT NULL,
    "complaintType" "ComplaintType" NOT NULL,
    "complaintDescription" TEXT NOT NULL,
    "complaintCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_timelines" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "testStatus" "TestStatus" NOT NULL,
    "testTimelineCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_timelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_timelines" (
    "id" SERIAL NOT NULL,
    "rentalId" INTEGER NOT NULL,
    "rentalStatus" "RentalStatus" NOT NULL,
    "rentalTimelineCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rental_timelines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoiceNumber_key" ON "payments"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "sample_tests" ADD CONSTRAINT "sample_tests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_timelines" ADD CONSTRAINT "test_timelines_testId_fkey" FOREIGN KEY ("testId") REFERENCES "sample_tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_timelines" ADD CONSTRAINT "rental_timelines_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
