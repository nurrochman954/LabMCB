// app/api/equipment-rental/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const rentalId = parseInt(id);

    const rental = await prisma.rentalForm.findUnique({
      where: { id: rentalId },
      include: {
        user: { select: { username: true, email: true }},
        timelines: {
          orderBy: { rentalTimelineCreatedAt: 'desc' }
        },
        equipmentOrders: true
      },
    });

    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rental);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const rentalId = parseInt(id);
    const body = await request.json();
    
    console.log('Received update body:', body);
    
    const {
      rentalRequestNumber,
      invoiceFile,
      paymentProof
    } = body;

    const updateData: any = {};

    if (rentalRequestNumber) updateData.rentalRequestNumber = rentalRequestNumber;
    if (invoiceFile !== undefined) updateData.invoiceFile = invoiceFile;
    if (paymentProof !== undefined) updateData.paymentProof = paymentProof;

    const updatedRental = await prisma.rentalForm.update({
      where: { id: rentalId },
      data: updateData
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedRental 
    });
  } catch (error) {
    console.error('Error updating rental:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}