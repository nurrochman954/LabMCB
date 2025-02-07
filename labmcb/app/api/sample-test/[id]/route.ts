// app/api/sample-test/[id]/route.ts
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
    const testId = parseInt(id);

    const sampleTest = await prisma.sampleTestForm.findUnique({
      where: { id: testId },
      include: {
        user: { select: { username: true, email: true }},
        timelines: {
          orderBy: { testTimelineCreatedAt: 'desc' }
        }
      },
    });

    if (!sampleTest) {
      return NextResponse.json(
        { error: 'Sample test not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(sampleTest);
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
    const testId = parseInt(id);
    const body = await request.json();
    
    console.log('Received update body:', body);
    
    const {
      sampleRequestNumber,
      invoiceFile,
      paymentProof,
      resultFile
    } = body;

    const updateData: any = {};

    if (sampleRequestNumber) updateData.sampleRequestNumber = sampleRequestNumber;
    if (invoiceFile !== undefined) updateData.invoiceFile = invoiceFile;
    if (paymentProof !== undefined) updateData.paymentProof = paymentProof;
    if (resultFile !== undefined) updateData.resultFile = resultFile;

    const updatedTest = await prisma.sampleTestForm.update({
      where: { id: testId },
      data: updateData
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedTest 
    });
  } catch (error) {
    console.error('Error updating sample test:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}