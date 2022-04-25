import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
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
  },
});

export const { userLogin,userLogout } = userSlice.actions;

export default userSlice.reducer;
