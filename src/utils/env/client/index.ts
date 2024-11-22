import { Elysia, t } from "elysia";

/** Schema for client-side environment variables in typebox */
const {
  models: { clientSchema },
} = new Elysia().model({
  clientSchema: t.Object({
    URL: t.String({
      minLength: 1,
      error: "URL client environment variable is not set!",
    }),
  }),
});

const clientEnvResult = clientSchema.safeParse({
  URL: process.env.NEXT_PUBLIC_URL,
});

if (!clientEnvResult.data) {
  const firstError = clientEnvResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid client environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll("  ", " ")}`,
    );
  else throw new Error(`Invalid client environment ${clientEnvResult.error}`);
}

export const clientEnv = clientEnvResult.data;
