// src/shared/hooks/useAuth.ts
import { useAppSelector } from "@/store/hooks";

export function useAuth() {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  return {
    user,
    accessToken,
    isAuthenticated: Boolean(user && accessToken),
  };
}
