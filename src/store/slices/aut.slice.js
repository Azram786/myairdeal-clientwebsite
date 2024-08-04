import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token_air_deal")
    ? JSON.parse(localStorage.getItem("token_air_deal"))
    : null,
  user: localStorage.getItem("user_air_deal")
    ? JSON.parse(localStorage.getItem("user_air_deal"))
    : null,
  resentSearch: null,
  lastSearch: null,
  resentSearchFilter: [[], []]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token_air_deal", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token_air_deal");
      localStorage.removeItem("user_air_deal");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user_air_deal", JSON.stringify(action.payload));
    },
    setResentSearch: (state, action) => {
      state.resentSearch = action.payload;
    },
    clearResent: (state) => {
      state.resentSearch = null;
    },
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
    },
    setResentSearchFromFilter: (state, action) => {
      state.resentSearchFilter[0].push(action.payload);
    },
    setResentSearchToFilter: (state, action) => {
      state.resentSearchFilter[1].push(action.payload);
    },
    clearResentSearchFilter: (state, action) => {
      state.resentSearchFilter = [[], []]
    }
  }
});

export const {
  setToken,
  logout,
  setUser,
  setResentSearch,
  clearResent,
  setLastSearch,
  setResentSearchFromFilter,
  setResentSearchToFilter,
  clearResentSearchFilter
} = authSlice.actions;

export default authSlice.reducer;
