import { safeParse } from "@/utils/base";
import { Type as t } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

const clientSchema = t.Object({
  URL: t.String({
    minLength: 1,
    error: "URL client environment variable is not set!",
  }),
});

const clientSchemaChecker = TypeCompiler.Compile(clientSchema);

const clientEnvResult = safeParse(clientSchemaChecker, {
  URL: process.env.NEXT_PUBLIC_URL,
});

if (!clientEnvResult.success) {
  const firstError = clientEnvResult.errors[0];
  if (firstError) {
    throw new Error(
      `Invalid client environment variable: ${firstError.message}`,
    );
  }
  throw new Error(`Invalid client environment validation failed`);
}

export const clientEnv = clientEnvResult.data;
