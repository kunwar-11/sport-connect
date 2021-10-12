import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../util";
const initialState = {
  feeds: null,
  suggestedPosts: null,
  suggestedUsers: null,
  feedStatus: "idle",
  suggestedPostStatus: "idle",
  suggestedUserStatus: "idle",
  likedOrUnliked: "idle",
};

export const getUserFeeds = createAsyncThunk("feed/getUserFeeds", async () => {
  try {
    const { data, status } = await axios.get(`${API_URL}feeds`, {
      headers: {
        authorization: JSON.parse(localStorage?.getItem("loggedInUser"))?.token,
      },
    });
    console.log(data?.feeds);
    if (status === 200) {
      return data?.feeds;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const getSuggestedPosts = createAsyncThunk(
  "feed/getSuggestedPosts",
  async () => {
    try {
      const { data, status } = await axios.get(
        `${API_URL}post/suggestedposts`,
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 200) {
        console.log(data?.posts);
        return data?.posts;
      }
    } catch (error) {
      return error;
    }
  }
);

export const getSuggestedUser = createAsyncThunk(
  "feed/getSuggestedUser",
  async () => {
    try {
      const { data, status } = await axios.get(
        `${API_URL}user/suggestedusers`,
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      console.log(data);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const likeButtonPressed = createAsyncThunk(
  "feed/likeButtonPressed",
  async ({ postId, from }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}post/${postId}/updateLike`,
        {},
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 201) {
        console.log(data);
        return fulfillWithValue({ ...data, from });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const commentPostButtonClicked = createAsyncThunk(
  "feed/commentPostButtonClicked",
  async ({ text, postId, from }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}post/${postId}/addComment`,
        {
          text,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 201) {
        console.log(data);
        return fulfillWithValue({ ...data, from });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const feedsSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    likedOrUnlikedPost: (state, action) => {
      state.likedOrUnliked = action.payload;
    },
  },
  extraReducers: {
    [getUserFeeds.pending]: (state) => {
      state.feedStatus = "loading";
    },
    [getUserFeeds.fulfilled]: (state, action) => {
      console.log(action);
      state.feeds = action.payload;
      state.feedStatus = "fulfilled";
    },
    [getUserFeeds.rejected]: (state) => {
      state.feedStatus = "rejected";
    },
    [getSuggestedPosts.pending]: (state) => {
      state.suggestedPostStatus = "loading";
    },
    [getSuggestedPosts.fulfilled]: (state, action) => {
      state.suggestedPosts = action.payload;
      state.suggestedPostStatus = "fulfilled";
    },
    [getSuggestedPosts.rejected]: (state) => {
      state.suggestedPostStatus = "rejected";
    },
    [getSuggestedUser.pending]: (state) => {
      state.suggestedUserStatus = "pending";
    },
    [getSuggestedUser.fulfilled]: (state, action) => {
      state.suggestedUsers = action.payload.SuggestedUsers;
      state.suggestedUserStatus = "fullfilled";
    },
    [getSuggestedUser.rejected]: (state) => {
      state.suggestedUserStatus = "rejected";
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.from === "feeds") {
        state.feeds.forEach((each) => {
          if (each._id === action.payload.postId) {
            if (state.likedOrUnliked === "like") {
              each.likes.push({ _id: action.payload.userId });
            } else {
              const index = each.likes.findIndex(
                (item) => item._id === action.payload.userId
              );
              each.likes.splice(index, 1);
            }
          }
        });
      } else {
        state.suggestedPosts.forEach((each) => {
          if (each._id === action.payload.postId) {
            if (state.likedOrUnliked === "like") {
              each.likes.push({ _id: action.payload.userId });
            } else {
              const index = each.likes.findIndex(
                (item) => item._id === action.payload.userId
              );
              each.likes.splice(index, 1);
            }
          }
        });
      }
    },
    [commentPostButtonClicked.fulfilled]: (state, action) => {
      if (action.payload.from === "feeds") {
        state.feeds.forEach((each) => {
          if (each._id === action.payload.postId) {
            each.comments.push({
              _id: action.payload._id,
              uid: action.payload.userId,
              text: action.payload.text,
            });
          }
        });
      } else {
        state.suggestedPosts.forEach((each) => {
          if (each._id === action.payload.postId) {
            each.comments.push({
              _id: action.payload._id,
              uid: action.payload.userId,
              text: action.payload.text,
            });
          }
        });
      }
    },
  },
});

export const { likedOrUnlikedPost } = feedsSlice.actions;

export default feedsSlice.reducer;
