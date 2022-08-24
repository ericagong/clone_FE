import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsRequest: (state, action) => {
      state.isLoading = true;
    },
    getPostsDone: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { getPostsRequest, getPostsDone } = postSlice.actions;
export default postSlice.reducer;
