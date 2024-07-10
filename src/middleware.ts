import { NextResponse, type NextRequest } from "next/server";
import { serverEnv } from "./utils/env/server";

/**
 * Nextjs bypass to set the server URL in the request headers so it can be read while in server components.
 */
export default async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(serverEnv.SERVER_URL_KEY, request.url);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
