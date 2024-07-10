"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import { authUser } from "@/server/auth/typebox";
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
      .then((user) => (user ? router.push("/dashboard") : setStatus(user)))
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
          minLength={authUser.properties.username.minLength}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col border">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <button className="bg-red-600" type="submit">
          Login
        </button>

        <Link href="/register">Register</Link>
      </div>
      {status && <div>{status}</div>}
    </form>
  );
}
