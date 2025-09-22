// src/features/auth/components/LoginForm.tsx
"use client";

import { useLoginMutation } from "../services/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "../store/authSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ email: "test@test.com", password: "123456" }).unwrap();
    dispatch(setCredentials(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isLoading}>Login</button>
    </form>
  );
}
