// lib/auth.ts
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function syncUserWithDB() {
 const clerkUser = await currentUser();
 if (!clerkUser) return null;

 return await prisma.user.upsert({
   where: { clerkId: clerkUser.id },
   update: {
     username: clerkUser.username || `user_${clerkUser.id.slice(0,8)}`,
     fullName: `${clerkUser.firstName} ${clerkUser.lastName}`, 
     email: clerkUser.emailAddresses[0]?.emailAddress || "",
     imageUrl: clerkUser.imageUrl || ""
   },
   create: {
     clerkId: clerkUser.id,
     username: clerkUser.username || `user_${clerkUser.id.slice(0,8)}`,
     fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
     email: clerkUser.emailAddresses[0]?.emailAddress || "",
     imageUrl: clerkUser.imageUrl || ""
   }
 });
}