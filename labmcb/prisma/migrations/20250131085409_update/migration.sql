/*
  Warnings:

  - The values [UNPAID,WAITING_VERIFICATION] on the enum `RentalStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TESTING,UNPAID,WAITING_VERIFICATION] on the enum `TestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RentalStatus_new" AS ENUM ('SUBMITTED', 'RECEIVED', 'REVIEWING', 'APPROVED', 'REJECTED', 'PAID', 'DELIVERY', 'IN_USE', 'RETURNED');
ALTER TABLE "rental_timelines" ALTER COLUMN "rentalStatus" TYPE "RentalStatus_new" USING ("rentalStatus"::text::"RentalStatus_new");
ALTER TYPE "RentalStatus" RENAME TO "RentalStatus_old";
ALTER TYPE "RentalStatus_new" RENAME TO "RentalStatus";
DROP TYPE "RentalStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TestStatus_new" AS ENUM ('SUBMITTED', 'RECEIVED', 'REVIEWING', 'APPROVED', 'REJECTED', 'TESTED', 'PAID', 'COMPLETED');
ALTER TABLE "test_timelines" ALTER COLUMN "testStatus" TYPE "TestStatus_new" USING ("testStatus"::text::"TestStatus_new");
ALTER TYPE "TestStatus" RENAME TO "TestStatus_old";
ALTER TYPE "TestStatus_new" RENAME TO "TestStatus";
DROP TYPE "TestStatus_old";
COMMIT;
