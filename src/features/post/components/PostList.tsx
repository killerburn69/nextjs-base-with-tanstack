"use client";
import { usePosts } from "../hooks/usePosts";

export function PostList() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {data.map((post: any) => (
        <li key={post.id} className="border-b py-2">
          {post.title}
        </li>
      ))}
    </ul>
  );
}
