import axios from "@/lib/axiosClient";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await axios.post("/login", data);
    return res.data;
  },
  me: async () => {
    const res = await axios.get("/me");
    return res.data;
  },
};
