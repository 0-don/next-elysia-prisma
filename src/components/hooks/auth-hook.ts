import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation } from "@tanstack/react-query";

/**
 * Custom hook which can be imported in "use client" components
 */
export const AuthHook = () => {
  /**
   * Uses the RPC client to call the register endpoint parse it with handleEden.
   */
  const registerMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.auth.register.post>
    ) => handleEden(await rpc.api.auth.register.post(...args)),
  });

  /**
   * Uses the RPC client to call the login endpoint and parse it with handleEden.
   */
  const loginMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.auth.login.post>) =>
      handleEden(await rpc.api.auth.login.post(...args)),
  });

  /**
   * Uses the RPC client to call the logout endpoint and parse it with handleEden.
   */
  const logoutMutation = useMutation({
    mutationFn: async () => handleEden(await rpc.api.auth.logout.get()),
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
};
