import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  // Get the QueryClient server component instance
  const queryClient = getQueryClient();

  // Fetch current user data set cookies are required else they will be empty
  const { data: me, error: meError } = await rpc.api.user.me.get(
    await setCookies(),
  );

  if (meError) redirect("/login");

  // Set the fetched user data in the query client cache `src/components/hooks/user-hook.ts`
  queryClient.setQueryData(["me"], me);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}
