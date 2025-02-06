// app/api/complaints/[formType]/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { formType: string; id: string } }
) {
  try {
    const { description } = await request.json();
    const formId = parseInt(params.id);
    const formType = params.formType;

    // Validasi formType
    if (formType !== 'sample-test' && formType !== 'equipment-rental') {
      return NextResponse.json(
        { success: false, error: 'Invalid form type' },
        { status: 400 }
      );
    }

    const complaint = await prisma.complaint.create({
      data: {
        complaintDescription: description,
        ...(formType === 'sample-test'
          ? { sampleTestFormId: formId }
          : { rentalFormId: formId })
      }
    });

    return NextResponse.json({ success: true, data: complaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit complaint' },
      { status: 500 }
    );
  }
}

// Untuk mendapatkan daftar complaint berdasarkan formType dan id
export async function GET(
  request: Request,
  { params }: { params: { formType: string; id: string } }
) {
  try {
    const formId = parseInt(params.id);
    const formType = params.formType;

    const complaints = await prisma.complaint.findMany({
      where: formType === 'sample-test'
        ? { sampleTestFormId: formId }
        : { rentalFormId: formId },
      orderBy: { complaintCreateAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}