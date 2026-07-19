"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-6">
      <aside className="w-52 shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit">
        <nav className="space-y-1">
          <Link
            href="/admin/posts"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            記事一覧
          </Link>
          <Link
            href="/admin/categories"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            カテゴリー一覧
          </Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
