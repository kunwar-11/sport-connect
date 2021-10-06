import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../util";

const initialState = {
  userId: JSON.parse(localStorage?.getItem("loggedInUser"))?.userId || null,
  token: JSON.parse(localStorage?.getItem("loggedInUser"))?.token || null,
  login: JSON.parse(localStorage?.getItem("loggedInUser"))?.login || false,
  status: "idle",
};

export const logInUser = createAsyncThunk(
  "login/logInUser",
  async ({ userName, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}auth/login`, {
        userName,
        password,
      });
      if (data) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutButtonClicked: (state) => {
      state.userId = null;
      state.token = null;
      state.login = false;
      localStorage?.removeItem("loggedInUser");
    },
  },
  extraReducers: {
    [logInUser.pending]: (state) => {
      state.status = "loading";
    },
    [logInUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userId = action.payload?.userId;
        state.token = action.payload?.token;
        state.login = true;
        state.status = "fulfilled";

        localStorage?.setItem(
          "loggedInUser",
          JSON.stringify({
            userId: action.payload?.userId,
            token: action.payload?.token,
            profilePicture: action.payload?.profilePicture,
            login: true,
          })
        );
      }
    },
    [logInUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export const { logoutButtonClicked } = loginSlice.actions;
export default loginSlice.reducer;
