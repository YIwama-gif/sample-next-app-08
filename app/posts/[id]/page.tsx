"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import type { Post } from "../../_types/Post";
import { formatDate } from "../../_utils/formatDate";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const { post } = await res.json();
      setPost(post);
      setIsLoading(false);
    };

    fetcher();
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-700 mb-4">記事が見つかりませんでした。</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← 記事一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover bg-gray-100"
      />
      <div className="p-6 md:p-8">
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.postCategories.map((pc) => (
            <span
              key={pc.category.id}
              className="text-xs px-2 py-0.5 rounded border border-blue-300 text-blue-700 bg-blue-50"
            >
              {pc.category.name}
            </span>
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← 記事一覧へ戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
