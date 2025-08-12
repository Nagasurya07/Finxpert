import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Create a middleware that combines Clerk authentication with our Server Actions fix
function fixServerActionsOrigin(req) {
  const requestHeaders = new Headers(req.headers);
  
  // Fix for GitHub Codespaces - Set origin header to match x-forwarded-host
  if (requestHeaders.has('x-forwarded-host') && 
      requestHeaders.get('x-forwarded-host').includes('.app.github.dev')) {
    const forwardedHost = requestHeaders.get('x-forwarded-host');
    requestHeaders.set('origin', `https://${forwardedHost}`);
  }
  
  // Create a new request with the modified headers
  const newRequest = new Request(req.url, {
    method: req.method,
    headers: requestHeaders,
    body: req.body,
    cache: req.cache,
    credentials: req.credentials,
    integrity: req.integrity,
    keepalive: req.keepalive,
    mode: req.mode,
    redirect: req.redirect,
    referrer: req.referrer,
    referrerPolicy: req.referrerPolicy,
    signal: req.signal,
  });

  return newRequest;
}

// Apply Clerk middleware with our custom header fix
export default clerkMiddleware((auth, req) => {
  // First fix the headers for Server Actions
  const fixedRequest = fixServerActionsOrigin(req);
  
  // Then check authentication with Clerk
  return auth().then(({ userId }) => {
    // Redirect to sign in if accessing protected route without auth
    if (!userId && isProtectedRoute(fixedRequest)) {
      return auth().redirectToSignIn();
    }
    
    // Otherwise continue with the request
    return NextResponse.next({
      request: fixedRequest,
    });
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
