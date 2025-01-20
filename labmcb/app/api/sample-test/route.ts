import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { sampleTestSchema } from '@/lib/validations/sample-test';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    // Auth check
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find User.id from Clerk ID
    const localUser = await prisma.user.findFirst({
      where: { clerkId },
    });

    if (!localUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const rawData = await request.json();
    console.log('Received data:', rawData);

    const validatedData = sampleTestSchema.parse(rawData);
    console.log('Validated data:', validatedData);

    // Database operation
    const result = await prisma.$transaction(async (tx) => {
      const sampleTest = await tx.sampleTestForm.create({
        data: {
          userId: localUser.id, // Use local User.id
          ...validatedData,
        },
      });

      console.log('Sample test created:', sampleTest);

      const timeline = await tx.testTimeline.create({
        data: {
          testId: sampleTest.id,
          testStatus: 'SUBMITTED',
        },
      });

      console.log('Timeline created:', timeline);

      return { sampleTest, timeline };
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error('API Error:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create sample test',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
