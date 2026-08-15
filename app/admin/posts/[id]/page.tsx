"use client";

import { useParams, useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { useAdminPost, useAdminCategories } from "../../_hooks/useAdminApi";
import { PostForm } from "../_components/PostForm";
import type { PostFormValues } from "../_components/PostForm";

export default function AdminPostEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { data, error, isLoading, mutate } = useAdminPost(id);
  const { data: categoryData } = useAdminCategories();

  const handleSubmit: SubmitHandler<PostFormValues> = async (formData) => {
    if (!token) return;

    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        thumbnailImageKey: formData.thumbnailImageKey,
        categories: formData.categoryIds.map((categoryId) => ({
          id: Number(categoryId),
        })),
      }),
    });

    mutate();
    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDelete = async () => {
    if (!confirm("記事を削除しますか？")) return;
    if (!token) return;

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

  if (error) {
    return (
      <div className="text-center text-red-600 py-20">{error.message}</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事編集</h1>
      <PostForm
        defaultValues={
          data
            ? {
                title: data.post.title,
                content: data.post.content,
                thumbnailImageKey: data.post.thumbnailImageKey,
                categoryIds: data.post.postCategories.map(
                  (pc) => pc.category.id
                ),
              }
            : undefined
        }
        categories={categoryData?.categories ?? []}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitLabel="更新"
      />
    </div>
  );
}
