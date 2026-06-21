"use client";

import { useEffect, useState } from "react";
import { PostCard } from "./_components/PostCard";
import type { MicroCmsPost } from "./_types/MicroCmsPost";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://8qlf7pwyea.microcms.io/api/v1/posts",
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
          },
        }
      );
      const { contents } = await res.json();
      setPosts(contents);
      setIsLoading(false);
    };

    fetcher();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
