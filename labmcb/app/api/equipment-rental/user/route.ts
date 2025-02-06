// app/api/equipment-rental/user/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ data: [] });

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });

    if (!user) return NextResponse.json({ data: [] });

    const rentals = await prisma.rentalForm.findMany({
      where: { userId: user.id },
      include: {
        timelines: {
          orderBy: { rentalTimelineCreatedAt: 'desc' }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ data: rentals });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: [] });
  }
}