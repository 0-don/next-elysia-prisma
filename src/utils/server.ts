import { cookies, headers } from "next/headers";
import { serverEnv } from "./env/server";

/**
 * get cookie from nextjs header for RPC calls in server components ONLY.
 * @returns An object containing the cookie header for authentication.
 */
export const setCookies = async () => {
  const cookieStore = await cookies();
  const cookie = [serverEnv.AUTH_COOKIE]
    .map((name) => {
      const value = cookieStore.get(name)?.value;
      return value ? `${name}=${value}` : "";
    })
    .filter(Boolean)
    .join("; ");

  return { $headers: { cookie } };
};

/**
 * Retrieves the server URL from server components ONLY, connected with `middlerware.ts`
 * @returns The server URL string or undefined if not present.
 */
export const serverUrl = async () =>
  (await headers()).get(serverEnv.SERVER_URL_KEY);
