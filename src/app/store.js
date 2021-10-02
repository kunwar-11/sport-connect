import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
export const store = configureStore({
  reducer: {
    signup: signupReducer,
  },
});
