import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems"))
    : [],

  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress"))
    : {},
  paymentMethod: Cookies.get("paymentMethod")
    ? JSON.parse(Cookies.get("paymentMethod"))
    : "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExist = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (itemExist) {
        itemExist.quantity += 1;
        Cookies.set("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.cartItems.push(action.payload);
        Cookies.set("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.find((item) => item._id === action.payload);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        Cookies.set("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      Cookies.remove("cartItems");
    },
    paymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      Cookies.set("paymentMethod", JSON.stringify(action.payload));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      Cookies.set("shippingAddress", JSON.stringify(action.payload));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  paymentMethod,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
