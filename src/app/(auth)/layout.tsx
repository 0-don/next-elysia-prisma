import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { serverUrl, setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout(props: AuthLayoutProps) {
  // Get the QueryClient server component instance
  const queryClient = getQueryClient();

  // Fetch current user data set cookies are required else they will be empty
  const { error: meError } = await rpc.api.user.me.get(await setCookies());

  // serverUrl is a custom function because nextjs doesnt provide a way to read current url in server components
  if (!meError && !(await serverUrl())?.includes("logout"))
    redirect("/dashboard");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-screen">
        <section className="m-auto w-full max-w-[500px] p-5">
          {props.children}
        </section>
      </main>
    </HydrationBoundary>
  );
}
