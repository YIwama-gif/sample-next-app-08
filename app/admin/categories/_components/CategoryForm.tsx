"use client";

import type { FormEvent } from "react";

type Props = {
  name: string;
  setName: (name: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export const CategoryForm = ({
  name,
  setName,
  onSubmit,
  onDelete,
  isSubmitting,
  submitLabel,
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          カテゴリー名
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-5 py-2 rounded transition"
        >
          {submitLabel}
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold px-5 py-2 rounded transition"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
