import { clerkMiddleware } from '@clerk/nextjs/server'

// Only Clerk session hydration runs here — no route matching.
// Admin route protection is handled in src/app/admin/layout.tsx via auth().protect()
// See: https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
}
