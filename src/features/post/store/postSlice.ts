// src/features/post/store/postSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  selectedPostId: string | null;
}

const initialState: PostState = {
  selectedPostId: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { selectPost } = postSlice.actions;
export default postSlice.reducer;
