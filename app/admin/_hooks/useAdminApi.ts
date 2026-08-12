import useSWR from "swr";
import type { Post } from "../../_types/Post";
import type { Category } from "../../_types/Category";
import { fetcherWithToken } from "../../_utils/fetcher";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";

// トークン付きでadmin APIを叩く共通処理
// tokenが未取得のうちはキーをnullにして、SWRのリクエストを止める
const useAdminSWR = <T>(path: string | null) => {
  const { token } = useSupabaseSession();

  return useSWR<T>(
    token && path ? [path, token] : null,
    ([url, token]: [string, string]) => fetcherWithToken(url, token)
  );
};

export const useAdminPosts = () => {
  const { data, error, isLoading, mutate } =
    useAdminSWR<{ posts: Post[] }>("/api/admin/posts");

  return { posts: data?.posts ?? [], error, isLoading, mutate };
};

export const useAdminPost = (id: string | undefined) => {
  const { data, error, isLoading, mutate } = useAdminSWR<{ post: Post }>(
    id ? `/api/admin/posts/${id}` : null
  );

  return { post: data?.post, error, isLoading, mutate };
};

export const useAdminCategories = () => {
  const { data, error, isLoading, mutate } = useAdminSWR<{
    categories: Category[];
  }>("/api/admin/categories");

  return { categories: data?.categories ?? [], error, isLoading, mutate };
};

export const useAdminCategory = (id: string | undefined) => {
  const { data, error, isLoading, mutate } = useAdminSWR<{
    category: Category;
  }>(id ? `/api/admin/categories/${id}` : null);

  return { category: data?.category, error, isLoading, mutate };
};
