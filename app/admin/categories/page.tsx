"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Category } from "../../_types/Category";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
      setIsLoading(false);
    };

    fetcher();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">カテゴリー一覧</h1>
        <Link
          href="/admin/categories/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          新規作成
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/admin/categories/${category.id}`}
            className="block px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
          >
            <div className="font-bold text-gray-900">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
