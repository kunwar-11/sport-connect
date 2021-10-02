import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = { signedUp: false, status: "idle" };
import { API_URL } from "../../../util";

const signUpUser = createAsyncThunk(
  "signup/signUpUser",
  async (
    { firstName, lastName, userName, email, password },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, {
        firstName,
        lastName,
        userName,
        userName,
        email,
        password,
      });
      if (data.success) {
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
        state.status = "fulfulled";
        state.signedUp = action.payload;
      }
    },
    [signUpUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default signupSlice.reducers;
