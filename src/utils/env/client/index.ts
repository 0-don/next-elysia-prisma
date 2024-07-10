import { parse } from "@/utils/base";
import { Type as t } from "@sinclair/typebox/type";

/** Schema for client-side environment variables in typebox */
const clientEnvSchema = t.Object({
  URL: t.String({
    minLength: 1,
    error: "URL client environment variable is not set!",
  }),
});

/** Parsed and validated client environment variables */
export const clientEnv = parse(clientEnvSchema, {
  URL: process.env.NEXT_PUBLIC_URL,
});