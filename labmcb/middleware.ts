import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Perbaiki pattern matching
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isUserRoute = createRouteMatcher(['/(.*)']) // Ubah ini
const isApiRoute = createRouteMatcher(['/api/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;
  
  // Tambahkan logging untuk debug
  console.log('Current route:', req.url);
  console.log('User role:', role);
  
  if (isApiRoute(req)) {
    return NextResponse.next();
  }

  // Perbaiki logic redirect
  if (role === 'admin' && !isAdminRoute(req)) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (role !== 'admin' && isAdminRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
})

// Perbaiki matcher pattern
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/(api|trpc)(.*)',
  ],
}