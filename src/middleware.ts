import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  return undefined;
});

export const config = {
  matcher: ["/admin/:path*"],
};
