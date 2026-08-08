"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useSupabaseSession } from "../../../_hooks/useSupabaseSession";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoryNewPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを作成しました");
    router.push("/admin/categories");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー作成</h1>
      <CategoryForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="作成"
      />
    </div>
  );
}
