"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
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
          Register
        </button>

        <Link href="/login">Login</Link>
      </div>
      {status && <div>{status}</div>}
    </form>
  );
}
