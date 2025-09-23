import { useAppSelector } from "@/store/hook";


export function useAuth() {
  const { user, accessToken, loading, error } = useAppSelector((s) => s.auth);
  return {
    user,
    accessToken,
    loading,
    error,
    isAuthenticated: Boolean(user && accessToken),
  };
}
