// lib/auth.ts
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function syncUserWithDB() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const existingUser = await prisma.user.findFirst({
    where: { 
      clerkId: clerkUser.id
    }
  })

  if (!existingUser) {
    return await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        username: clerkUser.username || `user_${clerkUser.id.slice(0, 8)}`, 
        fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
      }
    })
  }

  return existingUser
}