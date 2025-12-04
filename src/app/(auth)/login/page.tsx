"use client";

import { useLoginMutation } from "@/hooks/auth-hook";
import {
  authenticationChecker,
  authenticationSchema,
} from "@/lib/typebox/auth";
import { safeParse } from "@/lib/utils/base";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const router = useRouter();
  const loginMutation = useLoginMutation();
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
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              minLength={authenticationSchema.properties.username.minLength}
              maxLength={authenticationSchema.properties.username.maxLength}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              minLength={authenticationSchema.properties.password.minLength}
              maxLength={authenticationSchema.properties.password.maxLength}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={
              loginMutation.isPending ||
              !safeParse(authenticationChecker, {
                username,
                password,
              }).success
            }
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

          {status && (
            <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
              {status}
            </div>
          )}

          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-500 hover:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
