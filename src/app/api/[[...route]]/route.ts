import { authRoute } from "@/server/auth";
import { demoRoute } from "@/server/demo";
import { userRoute } from "@/server/user";
import { Elysia } from "elysia";

export const dynamic = "force-dynamic";

/**
 * Main API router
 * Combines auth and user routes under the '/api' prefix
 */
const app = new Elysia({ prefix: "/api" })
  .use(userRoute)
  .use(authRoute)
  .use(demoRoute);

/**
 * Export the app type for use with RPC clients (e.g., edenTreaty)
 */
export type App = typeof app;

/**
 * Export handlers for different HTTP methods
 * These are used by Next.js API routes [[...route]].ts
 */
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
