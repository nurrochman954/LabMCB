// app/api/sample-test/[id]/timeline/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TestStatus } from '@prisma/client';

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
    const timeline = await prisma.testTimeline.findMany({
      where: { testId },
      orderBy: { testTimelineCreatedAt: 'desc' }
    });

    return NextResponse.json(timeline);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const testId = parseInt(id);
    const { status } = await request.json();

    if (!Object.values(TestStatus).includes(status)) {
      return NextResponse.json(
        { error: `Invalid status: ${status}` },
        { status: 400 }
      );
    }

    const timeline = await prisma.testTimeline.create({
      data: {
        testId,
        testStatus: status,
      }
    });

    return NextResponse.json({ success: true, data: timeline });
  } catch (error) {
    console.error('Timeline creation error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}