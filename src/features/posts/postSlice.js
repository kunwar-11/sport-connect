import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../util";
const initialState = {
  currentPost: null,
  status: "idle",
};

export const getCurrentPost = createAsyncThunk(
  "post/getCurrentPost",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.get(`${API_URL}post/${postId}`, {
        headers: {
          authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
            ?.token,
        },
      });
      if (status === 200) {
        console.log(data);
        return fulfillWithValue(data?.post);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [getCurrentPost.pending]: (state) => {
      state.status = "loading";
    },
    [getCurrentPost.fulfilled]: (state, action) => {
      state.currentPost = action.payload;
      state.status = "fulfilled";
    },
    [getCurrentPost.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export const { resetState } = postSlice.actions;
export default postSlice.reducer;
