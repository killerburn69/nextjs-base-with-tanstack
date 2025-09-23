"use client"
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import PostList from "@/features/post/components/PostList";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demo App</h1>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span>{user?.email}</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">
              <p className="text-blue-600">Login</p>
            </Link>
          )}
        </div>
      </header>
      <section>
        <h2 className="text-xl font-semibold mb-3">Posts</h2>
        <PostList />
      </section>
    </div>
  );
}
