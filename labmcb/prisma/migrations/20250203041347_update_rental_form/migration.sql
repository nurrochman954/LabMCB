/*
  Warnings:

  - You are about to drop the column `equipment` on the `rental_forms` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `rental_forms` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `rental_forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rental_forms" DROP COLUMN "equipment",
DROP COLUMN "quantity",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "rental_equipment_orders" (
    "id" SERIAL NOT NULL,
    "rentalFormId" INTEGER NOT NULL,
    "equipmentType" "RentalEquipment" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_equipment_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rental_equipment_orders" ADD CONSTRAINT "rental_equipment_orders_rentalFormId_fkey" FOREIGN KEY ("rentalFormId") REFERENCES "rental_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
