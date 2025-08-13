import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Apply Clerk middleware with our custom header fix (without recreating Request)
export default clerkMiddleware((auth, req) => {
  // Clerk v6: protect is a method on the auth function itself, not on the returned auth object.
  // Correct usage: auth.protect() (NOT auth().protect()).
  if (isProtectedRoute(req)) auth.protect();

  // Mutate headers AFTER auth logic so we don't interfere with Clerk's checks
  const requestHeaders = new Headers(req.headers);
  const fwdHost = requestHeaders.get("x-forwarded-host");
  if (fwdHost && fwdHost.includes(".app.github.dev")) {
    // Make origin match forwarded host to satisfy Next.js Server Actions host validation
    requestHeaders.set("origin", `https://${fwdHost}`);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)).*)",
    // Always run for API routes
    "/api/(.*)",
  ],
};
