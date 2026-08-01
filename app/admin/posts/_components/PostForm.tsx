"use client";

import type { FormEvent } from "react";
import type { Category } from "../../../_types/Category";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  categories: Category[];
  selectedCategoryIds: number[];
  toggleCategory: (id: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  selectedCategoryIds,
  toggleCategory,
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
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          内容
        </label>
        <textarea
          id="content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label
          htmlFor="thumbnailUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          サムネイルURL
        </label>
        <input
          id="thumbnailUrl"
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリー
        </p>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-1 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedCategoryIds.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                disabled={isSubmitting}
              />
              {category.name}
            </label>
          ))}
        </div>
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
