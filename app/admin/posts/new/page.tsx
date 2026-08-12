"use client";

import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { useAdminCategories } from "../../_hooks/useAdminApi";
import { PostForm } from "../_components/PostForm";
import type { PostFormValues } from "../_components/PostForm";

export default function AdminPostNewPage() {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { categories } = useAdminCategories();

  const handleSubmit: SubmitHandler<PostFormValues> = async (formData) => {
    if (!token) return;

    await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        thumbnailImageKey: formData.thumbnailImageKey,
        categories: formData.categoryIds.map((id) => ({ id: Number(id) })),
      }),
    });

    alert("記事を作成しました");
    router.push("/admin/posts");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事作成</h1>
      <PostForm
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="作成"
      />
    </div>
  );
}
