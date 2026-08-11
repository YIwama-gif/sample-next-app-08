"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import type { Category } from "../../../_types/Category";
import { fetcherWithToken } from "../../../_utils/fetcher";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { PostForm } from "../_components/PostForm";
import type { PostFormValues } from "../_components/PostForm";

export default function AdminPostNewPage() {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const { data } = useSWR<{ categories: Category[] }>(
    token ? ["/api/admin/categories", token] : null,
    ([url, token]: [string, string]) => fetcherWithToken(url, token)
  );

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
        categories={data?.categories ?? []}
        onSubmit={handleSubmit}
        submitLabel="作成"
      />
    </div>
  );
}
