"use client";

import useSWR from "swr";
import { PostCard } from "./_components/PostCard";
import type { Post } from "./_types/Post";
import { fetcher } from "./_utils/fetcher";

export default function Home() {
  const { data, error, isLoading } = useSWR<{ posts: Post[] }>(
    "/api/posts",
    fetcher
  );

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-20">{error.message}</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
