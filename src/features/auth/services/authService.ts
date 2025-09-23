import axiosClient from "@/lib/axiosClient";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    return res.data; // expected { user, accessToken, refreshToken? }
  },

  me: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  },

  // optional refresh endpoint for future
  refresh: async (refreshToken: string) => {
    const res = await axiosClient.post("/auth/refresh", { refreshToken });
    return res.data; // { accessToken, refreshToken?, user? }
  },
};
