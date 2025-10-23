import { NextResponse, type NextRequest } from "next/server";
import { SERVER_URL_KEY } from "./lib/utils/constants";

/**
 * Nextjs bypass to set the server URL in the request headers so it can be read while in server components.
 */
export default async function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(SERVER_URL_KEY, request.url);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
