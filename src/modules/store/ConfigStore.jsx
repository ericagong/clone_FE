import { configureStore } from "@reduxjs/toolkit";

import user from "../redux/user";

const store = configureStore({
  reducer: { user },
});

export default store;
