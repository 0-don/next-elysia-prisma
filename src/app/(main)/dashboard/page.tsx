"use client";

import ChatComponent from "@/components/simple-chat";
import { useMeQuery } from "@/hooks/user-hook";
import Link from "next/link";

interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  const meQuery = useMeQuery();

  return (
    <main>
      <div>id: {meQuery.data?.id}</div>
      <div>user: {meQuery.data?.username}</div>
      <ChatComponent />
      <Link className="bg-red-500" href="/logout">
        Logout
      </Link>
    </main>
  );
}
