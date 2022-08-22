import { createSlice } from "@reduxjs/toolkit/dist/createSlice";

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    //초기 comment 값을 불러오기
    get: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { get } = commentsSlice.actions;

export default commentsSlice.reducer;
