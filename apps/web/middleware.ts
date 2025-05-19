import { NextRequest } from 'next/server'
import { privateRoutes } from './constants/private-routes'
import { protectRoute } from './service/security/protect-route'

export async function middleware(request: NextRequest) {
  protectRoute(request, privateRoutes)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
