// app/api/equipment-rental/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { equipmentRentalSchema } from '@/lib/validations/equipment-rental';
import { RentalStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const rawData = await request.json();
    const validatedData = equipmentRentalSchema.parse(rawData);

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Generate rentalRequestNumber
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const count = await tx.rentalForm.count() + 1;
      const rentalRequestNumber = `ER${year}${month}${count.toString().padStart(4, '0')}`;

      const rental = await tx.rentalForm.create({
        data: {
          userId: user.id,
          rentalName: validatedData.rentalName,
          rentalEmail: validatedData.rentalEmail,
          rentalPhone: validatedData.rentalPhone,
          rentalAddress: validatedData.rentalAddress,
          rentalInstance: validatedData.rentalInstance,
          startDate: validatedData.startDate,
          endDate: validatedData.endDate,
          agreementFile: validatedData.agreementFile,
          rentalRequestNumber,
          equipmentOrders: {
            create: validatedData.equipmentOrders.map(order => ({
              equipmentType: order.equipmentType,
              quantity: order.quantity
            }))
          }
        },
        include: {
          equipmentOrders: true
        }
      });

      const timeline = await tx.rentalTimeline.create({
        data: {
          rentalId: rental.id,
          rentalStatus: 'SUBMITTED' as RentalStatus,
        },
      });

      return { rental, timeline };
    });

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rentals = await prisma.rentalForm.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        },
        timelines: {
          orderBy: {
            rentalTimelineCreatedAt: 'desc'
          },
          take: 1
        },
        equipmentOrders: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedRentals = rentals.map(rental => ({
      id: rental.id,
      rentalName: rental.rentalName,
      rentalRequestNumber: rental.rentalRequestNumber,
      username: rental.user.username,
      currentStatus: rental.timelines[0]?.rentalStatus || RentalStatus.SUBMITTED,
      createdAt: rental.createdAt,
      equipmentOrders: rental.equipmentOrders
    }));

    return NextResponse.json(formattedRentals);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch equipment rentals' },
      { status: 500 }
    );
  }
}