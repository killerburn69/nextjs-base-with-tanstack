"use client";

import React, { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
  const { posts, loading, error, fetch } = usePosts();

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  return (
    <ul className="space-y-2">
      {posts.map((p: any) => (
        <li key={p.id} className="border p-2 rounded">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
