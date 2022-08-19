import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("AccessToken") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
