// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Feature reducers
import authReducer from "@/features/auth/store/authSlice";
import postReducer from "@/features/post/store/postSlice";

// RTK Query APIs
import { authApi } from "@/features/auth/services/authApi";
import { postApi } from "@/features/post/services/postApi";

export const store = configureStore({
  reducer: {
    // slices
    auth: authReducer,
    post: postReducer,

    // apis
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ disable if you store non-serializable stuff like Dates
    })
      .concat(authApi.middleware)
      .concat(postApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
