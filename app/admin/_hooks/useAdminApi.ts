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

export const useAdminPosts = () =>
  useAdminSWR<{ posts: Post[] }>("/api/admin/posts");

export const useAdminPost = (id: string | undefined) =>
  useAdminSWR<{ post: Post }>(id ? `/api/admin/posts/${id}` : null);

export const useAdminCategories = () =>
  useAdminSWR<{ categories: Category[] }>("/api/admin/categories");

export const useAdminCategory = (id: string | undefined) =>
  useAdminSWR<{ category: Category }>(
    id ? `/api/admin/categories/${id}` : null
  );
