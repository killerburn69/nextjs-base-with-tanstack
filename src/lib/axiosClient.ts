import axios from "axios";
import { store } from "@/store";
import { logout } from "@/features/auth/store/authSlice";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // make sure this env is set
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // auto logout on 401
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
