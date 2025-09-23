import { useCallback } from "react";
import { fetchPostsRequest } from "../store/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export function usePosts() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.post);

  const fetch = useCallback(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return {
    posts: items,
    loading,
    error,
    fetch,
  };
}
