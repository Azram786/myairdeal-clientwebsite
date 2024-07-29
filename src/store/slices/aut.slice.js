import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token_air_deal")
    ? JSON.parse(localStorage.getItem("token_air_deal"))
    : null,
  user: localStorage.getItem("user_air_deal")
    ? JSON.parse(localStorage.getItem("user_air_deal"))
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
      localStorage.removeItem("user_air_deal")

    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user_air_deal", JSON.stringify(action.payload))
    }
  },
});

export const { setToken, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
