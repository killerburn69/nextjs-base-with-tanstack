"use client";

import { useAppDispatch } from "@/store/hook";
import { logout } from "../store/authSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logout())}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
