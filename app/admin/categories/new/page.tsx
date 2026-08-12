"use client";

import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { useAdminCategories } from "../../_hooks/useAdminApi";
import { CategoryForm } from "../_components/CategoryForm";
import type { CategoryFormValues } from "../_components/CategoryForm";

export default function AdminCategoryNewPage() {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { mutate } = useAdminCategories();

  const handleSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (!token) return;

    await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: data.name }),
    });

    mutate();
    alert("カテゴリーを作成しました");
    router.push("/admin/categories");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー作成</h1>
      <CategoryForm onSubmit={handleSubmit} submitLabel="作成" />
    </div>
  );
}
