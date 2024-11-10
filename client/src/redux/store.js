import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
  // Prevent errors if elements are not serialized
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
