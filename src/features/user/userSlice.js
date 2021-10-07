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
  },
});

export default userSlice.reducer;
