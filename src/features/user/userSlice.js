import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../util";

const initialState = {
  firstName: null,
  lastName: null,
  userName: null,
  profilePicture: null,
  posts: null,
  followers: null,
  following: null,
  status: "idle",
  updateProfileStatus: "idle",
};

export const getLoggedInUserDetails = createAsyncThunk(
  "user/getLoggedInUserDetails",
  async () => {
    try {
      const { status, data } = await axios.get(`${API_URL}user`, {
        headers: {
          authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
            ?.token,
        },
      });
      if (status === 200) {
        return data.user;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateLoggedInUserProfile = createAsyncThunk(
  "user/updateLoggedInUserProfile",
  async (
    { firstName, lastName, userName, profilePicture },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { status, data } = await axios.post(
        `${API_URL}user`,
        {
          firstName,
          lastName,
          userName,
          profilePicture,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 200) {
        return fulfillWithValue(data.user);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const followAnyUser = createAsyncThunk(
  "user/followAnyUser",
  async ({ userId, from }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}user/follow`,
        {
          followingID: userId,
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

export const unfollowAnyUser = createAsyncThunk(
  "user/unfollowAnyUser",
  async ({ userId, from }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}user/unfollow`,
        {
          unFollowingID: userId,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 201) {
        return fulfillWithValue({ ...data, from });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeUserWhoFollows = createAsyncThunk(
  "user/removeUserWhoFollows",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}user/removefollower`,
        {
          removedUserId: userId,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
              ?.token,
          },
        }
      );
      if (status === 201) {
        return fulfillWithValue(data?.removedUserId);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removePostButtonClicked = createAsyncThunk(
  "user/removePostButtonClicked",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}user/posts/${postId}`,
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
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getLoggedInUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [getLoggedInUserDetails.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.profilePicture = action.payload.profilePicture;
      state.posts = action.payload.posts;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.status = "fulfilled";
    },
    [getLoggedInUserDetails.rejected]: (state) => {
      state.status = "rejected";
    },
    [updateLoggedInUserProfile.pending]: (state) => {
      state.updateProfileStatus = "loading";
    },
    [updateLoggedInUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.profilePicture = action.payload.profilePicture;
      const data = JSON.parse(localStorage?.getItem("loggedInUser"));
      localStorage?.setItem(
        "loggedInUser",
        JSON.stringify({
          ...data,
          profilePicture: action.payload?.profilePicture,
        })
      );
      state.updateProfileStatus = "fullfilled";
    },
    [updateLoggedInUserProfile.rejected]: (state) => {
      state.updateProfileStatus = "rejected";
    },
    [followAnyUser.fulfilled]: (state, action) => {
      console.log(action);
      state.following.push({
        profilePicture: action.payload.followedUser.profilePicture,
        userName: action.payload.followedUser.userName,
        _id: action.payload.followedUser._id,
      });
    },
    [unfollowAnyUser.fulfilled]: (state, action) => {
      const index = state.following.findIndex(
        (each) => each._id === action.payload.unFollowingID
      );
      if (index > -1) {
        state.following.splice(index, 1);
      }
    },
    [removeUserWhoFollows.fulfilled]: (state, action) => {
      const index = state.followers.findIndex(
        (each) => each._id === action.payload
      );
      if (index > -1) {
        state.followers.splice(index, 1);
      }
    },
    [removePostButtonClicked.fulfilled]: (state, action) => {
      console.log(action);
      const index = state?.posts.forEach(
        (each) => each._id === action.payload.postId
      );
      state?.posts.splice(index, 1);
    },
  },
});

export default userSlice.reducer;
