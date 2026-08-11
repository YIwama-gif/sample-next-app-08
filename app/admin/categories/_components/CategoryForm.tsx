"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

export type CategoryFormValues = {
  name: string;
};

type Props = {
  defaultValues?: CategoryFormValues;
  onSubmit: SubmitHandler<CategoryFormValues>;
  onDelete?: () => void;
  submitLabel: string;
};

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  onDelete,
  submitLabel,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          {...register("name", { required: "カテゴリー名は必須です" })}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
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
