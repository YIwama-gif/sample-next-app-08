"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { Post } from "../../../_types/Post";
import type { Category } from "../../../_types/Category";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { PostForm } from "../_components/PostForm";

export default function AdminPostEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!id) return;
    if (!token) return;
    const fetcher = async () => {
      const postRes = await fetch(`/api/admin/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { post }: { post: Post } = await postRes.json();

      const categoryRes = await fetch("/api/admin/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { categories } = await categoryRes.json();

      setTitle(post.title);
      setContent(post.content);
      setThumbnailImageKey(post.thumbnailImageKey);
      setSelectedCategoryIds(post.postCategories.map((pc) => pc.category.id));
      setCategories(categories);
      setIsLoading(false);
    };

    fetcher();
  }, [id, token]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
        thumbnailImageKey,
        categories: selectedCategoryIds.map((categoryId) => ({
          id: categoryId,
        })),
      }),
    });

    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDelete = async () => {
    if (!confirm("記事を削除しますか？")) return;
    if (!token) return;
    setIsSubmitting(true);

    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    alert("記事を削除しました");
    router.push("/admin/posts");
  };

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事編集</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        toggleCategory={toggleCategory}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
        submitLabel="更新"
      />
    </div>
  );
}
