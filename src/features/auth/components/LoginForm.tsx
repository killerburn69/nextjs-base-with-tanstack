"use client";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={login.isPending}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {login.isPending ? "Logging in..." : "Login"}
      </button>
      {login.isError && <p className="text-red-500">Error logging in</p>}
    </form>
  );
}
