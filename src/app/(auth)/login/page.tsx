"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import {
  authenticationChecker,
  authenticationSchema,
} from "@/lib/typebox/auth";
import { safeParse } from "@/utils/base";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const router = useRouter();
  const { loginMutation } = AuthHook();
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    loginMutation
      .mutateAsync({
        username,
        password,
      })
      .then(() => router.push("/dashboard"))
      .catch((error) => setStatus(JSON.stringify(error)));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex flex-col border">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          minLength={authenticationSchema.properties.username.minLength}
          maxLength={authenticationSchema.properties.username.maxLength}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
      </div>
      <div className="flex flex-col border">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength={authenticationSchema.properties.password.minLength}
          maxLength={authenticationSchema.properties.password.maxLength}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      <div className="flex justify-between">
        <button
          className="bg-red-600 disabled:bg-gray-600"
          type="submit"
          disabled={
            loginMutation.isPending ||
            !safeParse(authenticationChecker, {
              username,
              password,
            }).success
          }
        >
          Login
        </button>

        <Link href="/register">Register</Link>
      </div>
      {status && <div>{status}</div>}
    </form>
  );
}
