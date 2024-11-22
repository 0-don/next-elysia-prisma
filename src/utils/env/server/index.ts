import { SERVER_URL_KEY } from "@/utils/constants";
import { Elysia, t } from "elysia";

const {
  models: { serverSchema },
} = new Elysia().model({
  serverSchema: t.Object({
    DATABASE_URL: t.String({ minLength: 1, error: "DATABASE_URL not set!" }),
    SECRET: t.String({ minLength: 1, error: "SECRET not set!" }),
    NODE_ENV: t.Union(
      [t.Literal("development"), t.Literal("test"), t.Literal("production")],
      {
        error: "NODE_ENV not set!",
      },
    ),
    AUTH_COOKIE: t.Literal("auth", { error: "AUTH_COOKIE not set!" }),
    SERVER_URL_KEY: t.Literal(SERVER_URL_KEY, { error: "SERVER_URL not set!" }),
    SEVEN_DAYS: t.Integer({ minimum: 1, error: "SEVEN_DAYS not set!" }),
  }),
});

const serverEnvResult = serverSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  AUTH_COOKIE: "auth",
  SERVER_URL_KEY,
  SEVEN_DAYS: 60 * 60 * 24 * 7, // 7 days in seconds
});

if (!serverEnvResult.data) {
  const firstError = serverEnvResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid server environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll("  ", " ")}`,
    );
  else throw new Error(`Invalid server environment ${serverEnvResult.error}`);
}

export const serverEnv = serverEnvResult.data;
