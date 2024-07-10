import { parse } from "@/utils/base";
import { Type as t } from "@sinclair/typebox/type";

/** Schema for server-side environment variables in typebox */
const serverEnvSchema = t.Object({
  DATABASE_URL: t.String({ minLength: 1, error: "DATABASE_URL not set!" }),
  SECRET: t.String({ minLength: 1, error: "SECRET not set!" }),
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production")], 
    { error: "NODE_ENV not set!" }),
  AUTH_COOKIE: t.Literal("auth", { error: "AUTH_COOKIE not set!" }),
  SERVER_URL_KEY: t.Literal("x-url", { error: "SERVER_URL not set!" }),
  SEVEN_DAYS: t.Integer({ minimum: 1, error: "SEVEN_DAYS not set!" }),
});

/** Parsed and validated server environment variables */
export const serverEnv = parse(serverEnvSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  AUTH_COOKIE: "auth",
  SERVER_URL_KEY: "x-url",
  SEVEN_DAYS: 60 * 60 * 24 * 7, // 7 days in seconds
});