"use client";

import { useParams, useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { useAdminCategory } from "../../_hooks/useAdminApi";
import { CategoryForm } from "../_components/CategoryForm";
import type { CategoryFormValues } from "../_components/CategoryForm";

export default function AdminCategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { category, error, isLoading, mutate } = useAdminCategory(id);

  const handleSubmit: SubmitHandler<CategoryFormValues> = async (formData) => {
    if (!token) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: formData.name }),
    });

    mutate();
    alert("カテゴリーを更新しました");
    router.push("/admin/categories");
  };

  const handleDelete = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;
    if (!token) return;

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

  if (error) {
    return (
      <div className="text-center text-red-600 py-20">{error.message}</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー編集</h1>
      <CategoryForm
        defaultValues={{ name: category?.name ?? "" }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitLabel="更新"
      />
    </div>
  );
}
