import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Modifikasi endpoint yang ada
export async function POST() {
    try {
      const { userId } = await auth();
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Selalu create/update user saat login
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(userId);
      
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {
          fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
        },
        create: {
          id: userId,
          fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          phone: "",        
          institution: "", 
          address: ""       
        }
      });
  
      return NextResponse.json(user);
    } catch (error) {
      console.error("[USER_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }