import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
import loginReducer from "../features/login/loginSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
