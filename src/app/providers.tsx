// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}
