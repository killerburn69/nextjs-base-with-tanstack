// src/features/post/services/postApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/posts",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "/",
    }),
    getPostById: builder.query<any, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
