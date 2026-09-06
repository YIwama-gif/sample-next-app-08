"use client";

import { useForm, SubmitHandler } from "react-hook-form";

const CONTACT_ENDPOINT =
  "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: ContactValues = { name: "", email: "", message: "" };

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ defaultValues: initialValues });

  // 送信ボタン押下時の処理
  const onSubmit: SubmitHandler<ContactValues> = async (data) => {
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      alert("送信しました");
      reset(initialValues);
    } catch (error) {
      console.error(error);
      alert("送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  // クリアボタン
  const handleClear = () => {
    if (isSubmitting) return;
    reset(initialValues);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせ</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            お名前
          </label>
          <input
            id="name"
            type="text"
            disabled={isSubmitting}
            {...register("name", {
              required: "お名前を入力してください",
              maxLength: {
                value: 30,
                message: "30文字以内で入力してください",
              },
              validate: (value) =>
                value.trim() !== "" || "お名前を入力してください",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            disabled={isSubmitting}
            {...register("email", {
              required: "メールアドレスを入力してください",
              pattern: {
                value: EMAIL_REGEX,
                message: "メールアドレスの形式で入力してください",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            本文
          </label>
          <textarea
            id="message"
            rows={6}
            disabled={isSubmitting}
            {...register("message", {
              required: "本文を入力してください",
              maxLength: {
                value: 500,
                message: "500文字以内で入力してください",
              },
              validate: (value) =>
                value.trim() !== "" || "本文を入力してください",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-5 py-2 rounded transition cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "送信中..." : "送信"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="border border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-gray-700 font-semibold px-5 py-2 rounded transition cursor-pointer disabled:cursor-not-allowed"
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}
