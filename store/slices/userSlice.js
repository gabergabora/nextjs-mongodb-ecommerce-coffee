import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  favouriteList: Cookies.get("favouriteList")
    ? JSON.parse(Cookies.get("favouriteList"))
    : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      Cookies.set("userInfo", JSON.stringify(action.payload));
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      Cookies.remove("userInfo");
    },
    addToFavouriteList: (state, action) => {
      state.favouriteList.push(action.payload);
      Cookies.set("favouriteList", JSON.stringify(state.favouriteList));
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { userLogin, userLogout, addToFavouriteList } = userSlice.actions;

export default userSlice.reducer;
