import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
 try {
   const { userId } = await auth();
   if (!userId) {
     return new NextResponse("Unauthorized", { status: 401 });
   }

   const clerk = await clerkClient();
   const clerkUser = await clerk.users.getUser(userId);
   
   const user = await prisma.user.upsert({
     where: { clerkId: userId },
     update: {
       fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
       email: clerkUser.emailAddresses[0]?.emailAddress || "",
       imageUrl: clerkUser.imageUrl || "",
       username: clerkUser.username || `user_${userId.slice(0,8)}`
     },
     create: {
       clerkId: userId,
       fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
       email: clerkUser.emailAddresses[0]?.emailAddress || "",
       imageUrl: clerkUser.imageUrl || "",
       username: clerkUser.username || `user_${userId.slice(0,8)}`
     }
   });

   return NextResponse.json(user);
 } catch (error) {
   console.error("[USER_POST]", error);
   return new NextResponse("Internal error", { status: 500 });
 }
}