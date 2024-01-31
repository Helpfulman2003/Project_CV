import { createSlice } from "@reduxjs/toolkit";
import { currentProduct } from "../interface";

const initialState: {wishList: currentProduct[]} = {
    wishList: []
};

// Cấu hình slice
export const wishListSlice = createSlice({
  name: "wishList",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload
      const isItemExit = state.wishList && state.wishList.find((i) => i._id === item._id)
      if(isItemExit) {
        state.wishList = state.wishList.map((i) => i._id === item._id ? item : i)
      }else {
        state.wishList = [...state.wishList, item]
      }
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter((i) => i._id !== action.payload)
    },
    clearWishList: (state) => {
      state.wishList = []
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const {addToWishList, removeFromWishList, clearWishList} = wishListSlice.actions;

// Export reducer để nhúng vào Store
export default wishListSlice.reducer;