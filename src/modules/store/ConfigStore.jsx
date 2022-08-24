import { configureStore } from "@reduxjs/toolkit";

import user from "../redux/user";
import post from "../redux/post";

const store = configureStore({
  reducer: { user, post },
});

export default store;
