// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
// import { API_URL } from "../../util";
const initialState = {
  suggestedPosts: null,
  currentPost: null,
  status: "idle",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postSlice.reducer;
