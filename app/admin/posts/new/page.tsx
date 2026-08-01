"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { Category } from "../../../_types/Category";
import { PostForm } from "../_components/PostForm";

export default function AdminPostNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    "https://placehold.jp/800x400.png"
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };

    fetcher();
  }, []);

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        thumbnailUrl,
        categories: selectedCategoryIds.map((id) => ({ id })),
      }),
    });

    alert("記事を作成しました");
    router.push("/admin/posts");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事作成</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        toggleCategory={toggleCategory}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="作成"
      />
    </div>
  );
}
