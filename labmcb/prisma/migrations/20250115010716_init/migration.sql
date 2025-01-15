/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `sample_tests` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AnalysisType" AS ENUM ('XRF', 'XRD', 'SEM_EDS', 'UV_VIS', 'UTM', 'FTIR', 'TG_DSC', 'RAMAN', 'NMR', 'GC_MS', 'UPLC_MSMS', 'CPC', 'FREEZE_DRYER', 'MICRODRILL_DRMS', 'COLONY_COUNTER', 'MIKROSKOP_TRINOKULER', 'ROTARY_VACUUM_EVAPORATOR');

-- CreateEnum
CREATE TYPE "RentalEquipment" AS ENUM ('XRF_HANDHELD', 'MICRODRILL_DRMS', 'ULTRASONIC_HARDNESS_TESTER', 'UPV', 'THERMAL_CAMERA', 'SCHMIDT_HAMMER');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "rentalId" INTEGER,
ADD COLUMN     "sampleTestId" INTEGER;

-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "equipmentId",
DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "sample_tests" DROP COLUMN "equipmentId",
ADD COLUMN     "analysisTypes" "AnalysisType"[];

-- CreateTable
CREATE TABLE "rental_items" (
    "id" SERIAL NOT NULL,
    "rentalId" INTEGER NOT NULL,
    "equipment" "RentalEquipment" NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "rental_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rental_items" ADD CONSTRAINT "rental_items_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_sampleTestId_fkey" FOREIGN KEY ("sampleTestId") REFERENCES "sample_tests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
