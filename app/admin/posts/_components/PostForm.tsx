"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../_libs/supabase";
import type { Category } from "../../../_types/Category";

export type PostFormValues = {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categoryIds: number[];
};

type Props = {
  defaultValues?: PostFormValues;
  categories: Category[];
  onSubmit: SubmitHandler<PostFormValues>;
  onDelete?: () => void;
  submitLabel: string;
};

export const PostForm = ({
  defaultValues,
  categories,
  onSubmit,
  onDelete,
  submitLabel,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnailImageKey: "",
      categoryIds: [],
    },
  });

  const thumbnailImageKey = watch("thumbnailImageKey");

  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetchImageUrl = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetchImageUrl();
  }, [thumbnailImageKey]);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // 画像が選択されていないので終了
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const filePath = `private/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("post_thumbnail")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    // data.pathに画像固有のkeyが入っているのでthumbnailImageKeyに格納する
    setValue("thumbnailImageKey", data.path);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          {...register("title", { required: "タイトルは必須です" })}
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
        )}
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
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          {...register("content", { required: "内容は必須です" })}
        />
        {errors.content && (
          <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="thumbnailImageKey"
          className="block text-sm font-medium text-gray-700"
        >
          サムネイル画像
        </label>
        <input
          type="file"
          id="thumbnailImageKey"
          onChange={handleImageChange}
          accept="image/*"
          disabled={isSubmitting}
        />
        {thumbnailImageUrl && (
          <div className="mt-2">
            <Image
              src={thumbnailImageUrl}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
        )}
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
                value={category.id}
                disabled={isSubmitting}
                {...register("categoryIds")}
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
