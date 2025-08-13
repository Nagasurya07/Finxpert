import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Apply Clerk middleware with our custom header fix (without recreating Request)
export default clerkMiddleware((auth, req) => {
  const requestHeaders = new Headers(req.headers);

  // Align origin with forwarded host in Codespaces to satisfy Server Actions security check
  const fwdHost = requestHeaders.get("x-forwarded-host");
  if (fwdHost && fwdHost.includes(".app.github.dev")) {
    requestHeaders.set("origin", `https://${fwdHost}`);
  }

  const { userId } = auth();

  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)).*)",
    // Always run for API routes
    "/api/(.*)",
  ],
};
