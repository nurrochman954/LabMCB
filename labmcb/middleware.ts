import { clerkMiddleware } from '@clerk/nextjs/server';
 
export default clerkMiddleware();
 
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)',
    '/profile/:path*' // Tambahkan ini
  ],
};