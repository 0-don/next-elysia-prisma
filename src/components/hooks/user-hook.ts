import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook which can be imported in "use client" components
 */
export const UserHook = () => {
  /**
   * Uses the RPC client to call the user 'me' endpoint and parse it with handleEden.
   *
   * Note: This query is disabled by default, because its loaded over server components in `src/app/(main)/layout.tsx` and doenst need to be fetched
   */
  const meQuery = useQuery({
    queryKey: ["me"],
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.user.me.get()),
  });

  return {
    meQuery,
  };
};
