import { rpc } from "@/lib/rpc";
import { EdenArgs } from "@/lib/types/eden";
import { handleEden } from "@/lib/utils/base";
import { useMutation } from "@tanstack/react-query";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (
      args: EdenArgs<typeof rpc.api.auth.register, "post">,
    ) => handleEden(await rpc.api.auth.register.post(args.body)),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (args: EdenArgs<typeof rpc.api.auth.login, "post">) =>
      handleEden(await rpc.api.auth.login.post(args.body)),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: async () => handleEden(await rpc.api.auth.logout.get()),
  });
}
