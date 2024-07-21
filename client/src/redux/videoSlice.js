import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentUser: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
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

export const { loginStart, loginSuccess, loginFail, logOut } = videoSlice.actions;
export default videoSlice.reducer;
