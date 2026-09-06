"use client";

import Link from "next/link";
import { formatDate } from "../../_utils/formatDate";
import { useAdminPosts } from "../_hooks/useAdminApi";

export default function AdminPostsPage() {
  const { data, error, isLoading } = useAdminPosts();

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          新規作成
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {data?.posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="block px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
          >
            <div className="font-bold text-gray-900">{post.title}</div>
            <div className="text-sm text-gray-500 mt-1">
              {formatDate(post.createdAt)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
