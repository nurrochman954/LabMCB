// lib/validations/equipment-rental.ts
import { z } from 'zod';
import { RentalEquipment } from '@prisma/client';

const equipmentOrderSchema = z.object({
  equipmentType: z.nativeEnum(RentalEquipment),
  quantity: z.number().min(1, 'Quantity must be at least 1')
});

export const equipmentRentalSchema = z.object({
  rentalName: z.string().min(1, 'Name is required'),
  rentalEmail: z.string().email('Invalid email format'),
  rentalPhone: z.string().min(1, 'Phone number is required'),
  rentalAddress: z.string().min(1, 'Address is required'),
  rentalInstance: z.string().min(1, 'Institution is required'),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  equipmentOrders: z.array(equipmentOrderSchema).min(1, 'At least one equipment must be selected'),
  agreementFile: z.string().url().nullable()
});

export type EquipmentRentalFormData = z.infer<typeof equipmentRentalSchema>;