import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
// fix:comment

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req): Promise<any> {
  // Your custom middleware logic goes here
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("Is Logged in: ", isLoggedIn);

  const isAdminRoute = pathname.startsWith("/admin");
  const isSliderFecther = pathname.endsWith("/slides");
  //isSliderFecther ? console.log("has slides") : console.log("no slides");

  if (isAdminRoute && !isSliderFecther) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", req.url));
    }
    return null;
  }
  return null;
});

export const config = {
  matcher: [
    // Only match admin routes
    "/admin/:path*",
  ],
};
