import { queryKeys } from "@/lib/query/query-keys";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/lib/utils/base";
import { useQuery } from "@tanstack/react-query";

export function useMeQuery() {
  return useQuery({
    queryKey: queryKeys.me(),
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.user.me.get()),
  });
}

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.user(userId),
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.user[userId].get()),
  });
}
