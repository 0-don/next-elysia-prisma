"use client";

import { useLogoutMutation } from "@/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

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
