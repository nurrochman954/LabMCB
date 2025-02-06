import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const formType = searchParams.get('formType');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: 'Tanggal awal dan akhir harus diisi' },
        { status: 400 }
      );
    }

    if (!formType) {
      return NextResponse.json(
        { success: false, message: 'Tipe layanan harus dipilih' },
        { status: 400 }
      );
    }

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);

    if (formType === 'sample-test') {
      const results = await prisma.sampleTestForm.findMany({
        where: {
          createdAt: {
            gte: startDateTime,
            lte: endDateTime
          }
        },
        select: {
          analysisTypes: true
        }
      });

      const counts = results.reduce((acc, form) => {
        form.analysisTypes.forEach(type => {
          acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({ 
        success: true, 
        data: counts 
      });

    } else if (formType === 'equipment-rental') {
      const results = await prisma.rentalEquipmentOrder.findMany({
        where: {
          rentalForm: {
            createdAt: {
              gte: startDateTime,
              lte: endDateTime
            }
          }
        },
        select: {
          equipmentType: true
        }
      });

      const counts = results.reduce((acc, order) => {
        const type = order.equipmentType;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({ 
        success: true, 
        data: counts 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Tipe layanan tidak valid' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal melakukan pencarian' },
      { status: 500 }
    );
  }
}