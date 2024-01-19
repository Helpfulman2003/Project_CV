import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrderUser: {
    currentOrderUser: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allOrderUserSlice = createSlice({
  name: "allOrderUser",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getOrderStart: (state) => {
      state.allOrderUser.isFetching = true
    },
    getOrderSuccess: (state, action) => {
      state.allOrderUser.isFetching = false
      state.allOrderUser.currentOrderUser = action.payload
      state.allOrderUser.error = false
    },
    getOrderError: (state) => {
      state.allOrderUser.isFetching = false
      state.allOrderUser.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getOrderStart, getOrderSuccess, getOrderError } = allOrderUserSlice.actions;

// Export reducer để nhúng vào Store
export default allOrderUserSlice.reducer;