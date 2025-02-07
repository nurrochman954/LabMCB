// app/api/sample-test/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { sampleTestSchema } from '@/lib/validations/sample-test';

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const rawData = await request.json();
    const validatedData = sampleTestSchema.parse(rawData);

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }  // Optimize by selecting only needed field
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Generate sampleRequestNumber
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const count = await tx.sampleTestForm.count() + 1;
      const sampleRequestNumber = `ST${year}${month}${count.toString().padStart(4, '0')}`;

      const sampleTest = await tx.sampleTestForm.create({
        data: {
          userId: user.id,
          testName: validatedData.testName,
          testEmail: validatedData.testEmail,
          testPhone: validatedData.testPhone,
          testAddress: validatedData.testAddress,
          testInstanceName: validatedData.testInstanceName,
          analysisTypes: validatedData.analysisTypes,
          sampleName: validatedData.sampleName,
          sampleType: validatedData.sampleType,
          sampleQuantity: validatedData.sampleQuantity,
          samplePreparation: validatedData.samplePreparation,
          testDescription: validatedData.testDescription,
          deliveryMethod: validatedData.deliveryMethod,
          coverLetter: validatedData.coverLetter,
          resultFile: validatedData.resultFile,
          sampleRequestNumber
        },
      });

      const timeline = await tx.testTimeline.create({
        data: {
          testId: sampleTest.id,
          testStatus: 'SUBMITTED',
        },
      });

      return { sampleTest, timeline };
    });

    return NextResponse.json({
      success: true,
      data: result
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function GET() {
  try {
    const sampleTests = await prisma.sampleTestForm.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        },
        timelines: {
          orderBy: {
            testTimelineCreatedAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedTests = sampleTests.map(test => ({
      id: test.id,
      testName: test.testName,
      sampleRequestNumber: test.sampleRequestNumber,
      username: test.user.username,
      currentStatus: test.timelines[0]?.testStatus || 'SUBMITTED',
      createdAt: test.createdAt
    }));

    return NextResponse.json(formattedTests, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sample tests' },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}