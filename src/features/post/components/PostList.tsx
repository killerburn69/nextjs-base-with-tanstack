// src/features/post/components/PostList.tsx
"use client";

import { useGetPostsQuery } from "../services/postApi";

export default function PostList() {
  const { data, isLoading } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
