import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isUserRoute = createRouteMatcher(['/(root)?(.*)'])
const isApiRoute = createRouteMatcher(['/api/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;
  
  // Allow API routes to pass through for proper handling
  if (isApiRoute(req)) {
    return NextResponse.next();
  }

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

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}