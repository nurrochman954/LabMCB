import { z } from 'zod';
import { AnalysisType, SampleType, DeliveryMethod } from '@prisma/client';

export const sampleTestSchema = z.object({
  testName: z.string().min(1, 'Nama harus diisi'),
  testEmail: z.string().email('Email tidak valid'),
  testPhone: z.string().min(1, 'Nomor telepon harus diisi'),
  testAddress: z.string().min(1, 'Alamat harus diisi'),
  analysisTypes: z.array(z.nativeEnum(AnalysisType)).min(1, 'Pilih minimal satu jenis analisis'),
  sampleName: z.string().min(1, 'Nama sampel harus diisi'),
  sampleType: z.nativeEnum(SampleType),
  sampleQuantity: z.number().min(1, 'Jumlah sampel minimal 1'),
  testDescription: z.string().optional(),
  deliveryMethod: z.nativeEnum(DeliveryMethod),
  coverLetter: z.string().optional(),
});

export type SampleTestFormData = z.infer<typeof sampleTestSchema>;