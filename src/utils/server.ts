import { cookies, headers } from "next/headers";
import { serverEnv } from "./env/server";

/**
 * get cookie from nextjs header for RPC calls in server components ONLY.
 * @returns An object containing the cookie header for authentication.
 */
export const setCookies = () => ({
  $headers: {
    cookie: [serverEnv.AUTH_COOKIE]
      .map((cookie) => `${cookie}=${cookies().get(cookie)?.value}`)
      .join("; "),
  },
});

/**
 * Retrieves the server URL from server components ONLY, connected with `middlerware.ts`
 * @returns The server URL string or undefined if not present.
 */
export const serverUrl = () => headers().get(serverEnv.SERVER_URL_KEY);
