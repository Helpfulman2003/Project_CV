import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProduct: {
    currentProduct: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allProductSlice = createSlice({
  name: "allProduct",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.allProduct.isFetching = true
    },
    getProductSuccess: (state, action) => {
      state.allProduct.isFetching = false
      state.allProduct.currentProduct = action.payload
      state.allProduct.error = false
    },
    getProductError: (state) => {
      state.allProduct.isFetching = false
      state.allProduct.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getProductStart, getProductSuccess, getProductError } = allProductSlice.actions;

// Export reducer để nhúng vào Store
export default allProductSlice.reducer;