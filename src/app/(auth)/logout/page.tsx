"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const router = useRouter();
  const { logoutMutation } = AuthHook();

  useEffect(() => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        router.refresh(); // cache reset
        setTimeout(() => router.push("/login"), 1000);
      })
      .catch((error) => console.error(error));
  }, []);

  return <></>;
}
