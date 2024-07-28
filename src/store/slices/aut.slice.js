import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token_air_deal")
    ? JSON.parse(localStorage.getItem("token_air_deal"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token_air_deal", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem("token_air_deal");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
