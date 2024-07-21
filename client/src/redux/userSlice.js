import { createSlice } from "@reduxjs/toolkit";

// Our initial state
// this the real thing we can call it anywhere to get its data
const initialState = {
  CurrentUser: null,
  loading: false,
  error: false,
};

// userSlice will take three actions name,initial,reducers(functions)
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.CurrentUser = action.payload;
    },
    loginFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.CurrentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logOut } =
  userSlice.actions;
export default userSlice.reducer;
