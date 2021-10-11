import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
import loginReducer from "../features/login/loginSlice";
import userReducer from "../features/user/userSlice";
import feedsReducer from "../features/feeds/feedsSlice";
import postReducer from "../features/posts/postSlice";
export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    user: userReducer,
    feed: feedsReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
