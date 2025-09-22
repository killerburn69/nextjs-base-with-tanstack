import axios from "@/lib/axiosClient";

export const postService = {
  getPosts: async () => {
    const res = await axios.get("/posts");
    return res.data;
  },
};
