// lib/auth.ts
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// lib/auth.ts
export async function syncUserWithDB() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const existingUser = await prisma.user.findFirst({
    where: { 
      clerkId: clerkUser.id 
    }
  })

  if (!existingUser) {
    // Create new user
    return await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        username: clerkUser.username || `user_${clerkUser.id.slice(0, 8)}`,
        fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
      }
    })
  } else {
    // Update existing user
    return await prisma.user.update({
      where: { clerkId: clerkUser.id },
      data: {
        username: clerkUser.username || existingUser.username, // Gunakan username yang ada jika tidak ada di Clerk
        fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
      }
    })
  }
}