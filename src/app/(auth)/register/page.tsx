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

export default function RegisterPage() {
  const router = useRouter();
  const { registerMutation } = AuthHook();
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    registerMutation
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
          onChange={(e) => setUsername(e.target.value)}
          minLength={authenticationSchema.properties.username.minLength}
          maxLength={authenticationSchema.properties.username.maxLength}
          required
          autoComplete="username"
        />
      </div>
      <div className="flex flex-col border">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          minLength={authenticationSchema.properties.password.minLength}
          maxLength={authenticationSchema.properties.password.maxLength}
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
            registerMutation.isPending ||
            !safeParse(authenticationChecker, {
              username,
              password,
            }).success
          }
        >
          Register
        </button>

        <Link href="/login">Login</Link>
      </div>
      {status && <div>{status}</div>}
    </form>
  );
}
