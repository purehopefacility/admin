import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req):Promise<any> {
    // Your custom middleware logic goes here
    const { pathname } = req.nextUrl
    const isLoggedIn = true
    console.log('ROUTE: ', req.nextUrl.pathname);
    console.log("Is Logged in: ", isLoggedIn);

    const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(req.nextUrl.pathname);
    const isAdminRoute = pathname.startsWith('/admin')



    if(isAdminRoute){
        if(!isLoggedIn){
            return Response.redirect(new URL('/auth/login', req.url))
        }
        return null
    }
    return null

})

export const config = {
    matcher: [
        // Only match admin routes
        '/admin/:path*',
    ],
}