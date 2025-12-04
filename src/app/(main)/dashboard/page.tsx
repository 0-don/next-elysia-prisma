"use client";

import ChatComponent from "@/components/simple-chat";
import { useMeQuery } from "@/hooks/user-hook";
import Link from "next/link";

interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  const meQuery = useMeQuery();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="mt-2 space-y-1 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-500">ID:</span>{" "}
                {meQuery.data?.id || "Loading..."}
              </div>
              <div>
                <span className="font-medium text-gray-500">User:</span>{" "}
                {meQuery.data?.username || "Loading..."}
              </div>
            </div>
          </div>
          <Link
            href="/logout"
            className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2 font-medium text-red-400 transition-colors hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Logout
          </Link>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold">Chat</h2>
          <ChatComponent />
        </div>
      </div>
    </main>
  );
}
