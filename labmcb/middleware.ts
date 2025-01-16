import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isUserRoute = createRouteMatcher(['/(root)?(.*)'])  // Mencakup root routes dan (root) group

export default clerkMiddleware(async (auth, req) => {
  const role = (await auth()).sessionClaims?.metadata?.role;
  
  // Jika admin mencoba akses route non-admin
  if (role === 'admin' && !isAdminRoute(req)) {
    const url = new URL('/admin', req.url)
    return NextResponse.redirect(url)
  }

  // Jika user biasa mencoba akses route admin
  if (role !== 'admin' && isAdminRoute(req)) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}