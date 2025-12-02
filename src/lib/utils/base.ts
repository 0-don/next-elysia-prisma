import { TypeCompiler } from "@sinclair/typebox/compiler";
import type { Static, TSchema } from "@sinclair/typebox/type";

export declare class EdenFetchError<
  Status extends number = number,
  Value = unknown,
> extends Error {
  status: Status;
  value: Value;
  constructor(status: Status, value: Value);
}

/**
 * Helper to handle Eden.js API responses for use with TanStack Query.
 * Takes an Eden response object and either:
 * - Returns the data if successful
 * - Throws the error if unsuccessful
 *
 * @param response The Eden response object containing data or error
 * @returns The response data of type T
 * @throws EdenFetchError if the response contains an error
 */
export function handleEden<T, E = unknown>(
  response: (
    | {
        data: T;
        error: null;
      }
    | {
        data: null;
        error: EdenFetchError<number, E>;
      }
  ) & {
    status: number;
    response: Record<number, unknown>;
    headers: Record<string, string>;
  },
): T {
  if (response.error) throw response.error;
  return response.data;
}

/**
 * Safe parsing utility for TypeBox schemas that returns a discriminated union result
 * rather than throwing errors. Similar to Zod's safeParse pattern.
 *
 * @param checker A compiled TypeBox schema checker
 * @param value The value to validate
 * @returns An object with either:
 * - {success: true, data: validatedValue} if validation succeeds
 * - {success: false, errors: [{message: string}]} if validation fails
 */
export function safeParse<T extends TSchema>(
  checker: ReturnType<typeof TypeCompiler.Compile<T>>,
  value: Partial<Static<T>>,
):
  | { success: true; data: Static<T> }
  | { success: false; errors: { message: string }[] } {
  const isValid = checker.Check(value);

  if (isValid) {
    return {
      success: true,
      data: value as Static<T>,
    };
  }

  return {
    success: false,
    errors: Array.from(checker.Errors(value)).map((error) => ({
      message: error.message,
    })),
  };
}
