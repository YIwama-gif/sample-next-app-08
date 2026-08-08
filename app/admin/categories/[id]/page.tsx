"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { Category } from "../../../_types/Category";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!id) return;
    if (!token) return;
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { category }: { category: Category } = await res.json();
      setName(category.name);
      setIsLoading(false);
    };

    fetcher();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを更新しました");
    router.push("/admin/categories");
  };

  const handleDelete = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;
    if (!token) return;
    setIsSubmitting(true);

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    alert("カテゴリーを削除しました");
    router.push("/admin/categories");
  };

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー編集</h1>
      <CategoryForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
        submitLabel="更新"
      />
    </div>
  );
}
