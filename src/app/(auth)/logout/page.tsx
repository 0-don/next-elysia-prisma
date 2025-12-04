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

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
        <h2 className="text-xl font-semibold text-gray-300">Logging out...</h2>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we sign you out
        </p>
      </div>
    </div>
  );
}
