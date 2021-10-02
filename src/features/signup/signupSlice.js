import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../util";

const initialState = { signedUp: false, status: "idle" };

export const signUpUser = createAsyncThunk(
  "signup/signUpUser",
  async (
    { firstName, lastName, userName, email, password },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}auth/signup`, {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      if (data.success) {
        console.log(data);
        return fulfillWithValue(data.success);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "fulfilled";
        state.signedUp = action.payload;
      }
    },
    [signUpUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default signupSlice.reducer;
