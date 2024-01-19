import { createSlice } from "@reduxjs/toolkit";
import { currentProduct } from "../interface";

const initialState: {cart: currentProduct[]} = {
    cart: []
};

// Cấu hình slice
export const cartSlice = createSlice({
  name: "cart",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const isItemExit = state.cart && state.cart.find((i) => i._id === item._id)
      if(isItemExit) {
        state.cart = state.cart.map((i) => i._id === item._id ? item : i)
      }else {
        state.cart = [...state.cart, item]
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload)
    },
    clearCart: (state) => {
      state.cart = []
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

// Export reducer để nhúng vào Store
export default cartSlice.reducer;