/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extracts params from an Eden Treaty route function.
 */
type ExtractParams<TRoute> = TRoute extends (...args: any[]) => any
  ? Parameters<TRoute>[0]
  : {};

/**
 * Resolves the method function from a route (handles both static and parameterized).
 */
type ResolveMethod<TRoute, TMethod extends string> = TRoute extends (
  ...args: any[]
) => any
  ? TMethod extends keyof ReturnType<TRoute>
    ? ReturnType<TRoute>[TMethod]
    : never
  : TMethod extends keyof TRoute
    ? TRoute[TMethod]
    : never;

/**
 * Checks if a type looks like Eden Treaty options (has query/headers/fetch keys).
 */
type IsOptions<T> = [T] extends [never]
  ? false
  : NonNullable<T> extends { query: any }
    ? true
    : NonNullable<T> extends { headers: any }
      ? true
      : NonNullable<T> extends { fetch: any }
        ? true
        : NonNullable<T> extends { throwHttpError: any }
          ? true
          : false;

/**
 * Extracts query from an options-like type.
 */
type ExtractQuery<T> = NonNullable<T> extends { query: infer Q }
  ? { query: Q }
  : {};

/**
 * Extracts body + query from an Eden Treaty method function.
 *
 * Treaty 2 method signatures:
 * - GET (no query):    (options?) where options is optional, idx0 is options-like
 * - GET (with query):  (options) where options is required, idx0 is options-like
 * - POST (body only):  (body, options?) idx0 is body (not options-like)
 * - POST (body+query): (body, options) idx0 is body, idx1 is options with query
 *
 * Key insight: always check if idx0 is options-like first.
 * If yes -> it's a GET-style call, extract query from idx0.
 * If no  -> idx0 is body, extract query from idx1.
 */
type ExtractBodyAndQuery<TFn> = TFn extends (...args: any[]) => any
  ? 0 extends keyof Parameters<TFn>
    ? IsOptions<Parameters<TFn>[0]> extends true
      ? // First param is options (GET/HEAD style)
        ExtractQuery<Parameters<TFn>[0]>
      : // First param is body (POST/PUT/PATCH/DELETE style)
        [unknown] extends [Parameters<TFn>[0]]
        ? {}
        : { body: Parameters<TFn>[0] } & ExtractQuery<Parameters<TFn>[1]>
    : {}
  : {};

/**
 * Infers all args from an Eden Treaty route for any HTTP method.
 *
 * @example
 * // POST /:id with body + query
 * type A = EdenArgs<typeof rpc.api.user, "post">;
 * // { id: string; body: { name: string }; query: { count: string } }
 *
 * // GET with query (static route)
 * type B = EdenArgs<typeof rpc.api.demo.search, "get">;
 * // { query: { page: string; limit?: string } }
 *
 * // POST with body only (static route)
 * type C = EdenArgs<typeof rpc.api.demo.create, "post">;
 * // { body: { name: string; email: string } }
 *
 * // GET with params only
 * type D = EdenArgs<typeof rpc.api.demo, "get">;
 * // { id: string | number }
 */
export type EdenArgs<TRoute, TMethod extends string> = ExtractParams<TRoute> &
  ExtractBodyAndQuery<ResolveMethod<TRoute, TMethod>>;
