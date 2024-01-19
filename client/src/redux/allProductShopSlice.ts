import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductShop: {
    currentProduct: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allProductShopSlice = createSlice({
  name: "allProductShop",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.allProductShop.isFetching = true
    },
    getProductSuccess: (state, action) => {
      state.allProductShop.isFetching = false
      state.allProductShop.currentProduct = action.payload
      state.allProductShop.error = false
    },
    getProductError: (state) => {
      state.allProductShop.isFetching = false
      state.allProductShop.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getProductStart, getProductSuccess, getProductError } = allProductShopSlice.actions;

// Export reducer để nhúng vào Store
export default allProductShopSlice.reducer;