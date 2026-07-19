import type { Category } from "./Category";

export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  postCategories: {
    category: Category;
  }[];
};
