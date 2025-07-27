import { App } from "@/app/api/[[...route]]/route";
import { edenTreaty } from "@elysiajs/eden";

/**
 * Creates an RPC client using edenTreaty.
 *
 * This setup allows for type-safe API calls between the client and server,
 * leveraging the App type from the API route definition.
 *
 * The base URL for the RPC client is determined dynamically:
 * - On the server side, it uses localhost with the specified PORT (or 3000 as default)
 * - On the client side, it uses the current window's origin
 */
export const rpc = edenTreaty<App>(
  typeof window === "undefined"
    ? `http://localhost:${process.env.PORT || 3000}`
    : window.location.origin,
);
