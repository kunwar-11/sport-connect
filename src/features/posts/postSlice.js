import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../util";
import { likeButtonPressed } from "../feeds/feedsSlice";
import { commentPostButtonClicked } from "../feeds/feedsSlice";

const initialState = {
  currentPost: null,
  status: "idle",
  likedOrUnliked: "idle",
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

export const deleteCommentButtonPressed = createAsyncThunk(
  "post/deleteCommentButtonPressed",
  async (
    { postId, commentId, directed },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data, status } = await axios.delete(
        `${API_URL}post/${postId}/${commentId}`,
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 201) {
        console.log({ ...data, directed });
        return fulfillWithValue({ ...data, directed });
      }
    } catch (error) {}
  }
);
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.currentPost = null;
      state.likedOrUnliked = "idle";
    },
    likedOrUnlikedPost: (state, action) => {
      state.likedOrUnliked = action.payload;
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
    [likeButtonPressed.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.from === "currentPost") {
        if (state.likedOrUnliked === "like") {
          state.currentPost.likes.push({
            _id: action.payload.userId,
          });
          if (action.payload.directed === "feeds") {
          } else {
          }
        } else {
          const index = state.currentPost.likes.findIndex(
            (each) => each._id === action.payload.userId
          );
          console.log(index);
          state.currentPost.likes.splice(index, 1);
        }
      }
    },
    [commentPostButtonClicked.fulfilled]: (state, action) => {
      console.log("postSlice", action.payload);
      state?.currentPost?.comments.push({
        _id: action.payload._id,
        text: action.payload.text,
        user: {
          profilePicture: action.payload.profilePicture,
          _id: action.payload.userId,
          userName: action.payload.userName,
        },
      });
    },
    [deleteCommentButtonPressed.fulfilled]: (state, action) => {
      const index = state.currentPost.comments.findIndex(
        (each) => each._id === action.payload.commentId
      );
      state.currentPost.comments.splice(index, 1);
    },
  },
});

export const { resetState, likedOrUnlikedPost } = postSlice.actions;
export default postSlice.reducer;
