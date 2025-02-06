// app/api/sample-test/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);

    const sampleTest = await prisma.sampleTestForm.findUnique({
      where: { id },
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    // Add debug log
    console.log('Received update body:', body);
    // Extract all possible fields from body
    const {
      sampleRequestNumber,
      invoiceFile,
      paymentProof,
      resultFile
    } = body;

    // Build update data object
    const updateData: any = {};

    if (sampleRequestNumber) updateData.sampleRequestNumber = sampleRequestNumber;

    // Jika invoiceFile dikirim sebagai null, hapus dari database
    if (invoiceFile !== undefined) updateData.invoiceFile = invoiceFile;
    if (paymentProof !== undefined) updateData.paymentProof = paymentProof;
    // Jika resultFile dikirim sebagai null, hapus dari database
    if (resultFile !== undefined) updateData.resultFile = resultFile;

    const updatedTest = await prisma.sampleTestForm.update({
      where: { id },
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
