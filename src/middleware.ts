import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;

   const publicPath =
      path === "/login" || path === "/signup" || path === "/forgot-password";
   const securePath = path === "/logout" || path === "/account";

   const accesstoken = request.cookies.get("accessToken")?.value || "";

   if (accesstoken && publicPath) {
      return NextResponse.redirect(new URL("/", request.url));
   }
   if (!accesstoken && securePath) {
      return NextResponse.redirect(new URL("/login", request.url));
   }
}

export const config = {
   matcher: ["/login", "/logout", "/signup", "/account", "/forgot-password"],
};
