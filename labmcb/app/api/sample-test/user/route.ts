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

   const tests = await prisma.sampleTestForm.findMany({
     where: { userId: user.id },
     include: {
       timelines: {
         orderBy: { testTimelineCreatedAt: 'desc' }
       }
     },
     orderBy: {
       createdAt: 'desc'
     }
   });

   return NextResponse.json({ data: tests });

 } catch (error) {
   console.error('Error:', error);
   return NextResponse.json({ data: [] });
 }
}