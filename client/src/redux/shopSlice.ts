import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: {
    currentShop: {},
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const shopSlice = createSlice({
  name: "shop",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    loginStart: (state) => {
      state.shop.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.shop.isFetching = false
      state.shop.currentShop = action.payload
      state.shop.error = false
    },
    loginError: (state) => {
      state.shop.isFetching = false
      state.shop.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { loginStart, loginSuccess, loginError } = shopSlice.actions;

// Export reducer để nhúng vào Store
export default shopSlice.reducer;