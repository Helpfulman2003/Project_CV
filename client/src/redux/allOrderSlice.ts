import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrder: {
    currentOrder: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allOrderSlice = createSlice({
  name: "allOrder",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getOrderStart: (state) => {
      state.allOrder.isFetching = true
    },
    getOrderSuccess: (state, action) => {
      state.allOrder.isFetching = false
      state.allOrder.currentOrder = action.payload
      state.allOrder.error = false
    },
    getOrderError: (state) => {
      state.allOrder.isFetching = false
      state.allOrder.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getOrderStart, getOrderSuccess, getOrderError } = allOrderSlice.actions;

// Export reducer để nhúng vào Store
export default allOrderSlice.reducer;