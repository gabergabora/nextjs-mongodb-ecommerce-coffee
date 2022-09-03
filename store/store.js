import { configureStore } from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import cartReducer from "store/slices/cartSlice";
import userReducer from "store/slices/userSlice";

export const store = wrapMakeStore(() =>
  configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
    },
    middleware: (gDM) =>
      gDM().prepend(
        nextReduxCookieMiddleware({
          subtrees: ["user.userInfo"],
        })
      ),
  })
);

export const wrapper = createWrapper(store);
