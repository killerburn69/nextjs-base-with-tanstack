import axiosClient from "@/lib/axiosClient";

export const postService = {
  getPosts: async () => {
    const res = await axiosClient.get("/posts");
    return res.data; // expected array of posts
  },
};
