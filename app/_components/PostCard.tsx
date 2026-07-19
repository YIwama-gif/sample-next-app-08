"use client";

import Link from "next/link";
import Image from "next/image";
import type { Post } from "../_types/Post";
import { formatDate } from "../_utils/formatDate";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
    >
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-5">
        <p className="text-xs text-gray-500 mb-2">
          {formatDate(post.createdAt)}
        </p>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {post.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {post.postCategories.map((pc) => (
            <span
              key={pc.category.id}
              className="text-xs px-2 py-0.5 rounded border border-blue-300 text-blue-700 bg-blue-50"
            >
              {pc.category.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
