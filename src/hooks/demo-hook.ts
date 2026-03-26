import { rpc } from "@/lib/rpc";
import { EdenArgs } from "@/lib/types/eden";
import { handleEden } from "@/lib/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";


// 1. GET static - no params, no query, no body
export function useDemoSimpleQuery() {
  return useQuery({
    queryKey: ["demo", "simple"],
    queryFn: async () => handleEden(await rpc.api.demo.simple.get()),
  });
}

// 2. GET static with query
export function useDemoSearchQuery(
  args: EdenArgs<typeof rpc.api.demo.search, "get">,
) {
  return useQuery({
    queryKey: ["demo", "search", args.query],
    queryFn: async () =>
      handleEden(await rpc.api.demo.search.get({ query: args.query })),
  });
}

// 3. GET with params only
export function useDemoByIdQuery(
  args: EdenArgs<typeof rpc.api.demo, "get">,
) {
  return useQuery({
    queryKey: ["demo", args.id],
    queryFn: async () => handleEden(await rpc.api.demo(args).get()),
  });
}

// 4. GET with params + query
export function useDemoCommentsQuery(
  args: EdenArgs<typeof rpc.api.demo, "get"> &
    EdenArgs<ReturnType<typeof rpc.api.demo>["comments"], "get">,
) {
  return useQuery({
    queryKey: ["demo", args.id, "comments", args],
    queryFn: async () =>
      handleEden(
        await rpc.api.demo(args).comments.get({ query: args.query }),
      ),
  });
}

// 5. POST with body only (static route)
export function useDemoCreateMutation() {
  return useMutation({
    mutationFn: async (args: EdenArgs<typeof rpc.api.demo.create, "post">) =>
      handleEden(await rpc.api.demo.create.post(args.body)),
  });
}

// 6. POST with body + query (static route)
export function useDemoImportMutation() {
  return useMutation({
    mutationFn: async (
      args: EdenArgs<typeof rpc.api.demo.import, "post">,
    ) =>
      handleEden(
        await rpc.api.demo.import.post(args.body, { query: args.query }),
      ),
  });
}

// 7. POST with params + body
export function useDemoUpdateMutation() {
  return useMutation({
    mutationFn: async (
      args: EdenArgs<typeof rpc.api.demo, "get"> &
        EdenArgs<ReturnType<typeof rpc.api.demo>["update"], "post">,
    ) => handleEden(await rpc.api.demo(args).update.post(args.body)),
  });
}

// 8. POST with params + body + query (all three)
export function useDemoTransferMutation() {
  return useMutation({
    mutationFn: async (
      args: EdenArgs<typeof rpc.api.demo, "get"> &
        EdenArgs<ReturnType<typeof rpc.api.demo>["transfer"], "post">,
    ) =>
      handleEden(
        await rpc.api.demo(args).transfer.post(args.body, {
          query: args.query,
        }),
      ),
  });
}

// 9. DELETE with params only
export function useDemoDeleteMutation() {
  return useMutation({
    mutationFn: async (args: EdenArgs<typeof rpc.api.demo, "delete">) =>
      handleEden(await rpc.api.demo(args).delete()),
  });
}

