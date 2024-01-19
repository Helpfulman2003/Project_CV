import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCouponCode: {
    currentCouponCode: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allCouponCodeSlice = createSlice({
  name: "allCouponCode",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getCouponCodeStart: (state) => {
      state.allCouponCode.isFetching = true
    },
    getCouponCodeSuccess: (state, action) => {
      state.allCouponCode.isFetching = false
      state.allCouponCode.currentCouponCode = action.payload
      state.allCouponCode.error = false
    },
    getCouponCodeError: (state) => {
      state.allCouponCode.isFetching = false
      state.allCouponCode.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getCouponCodeStart, getCouponCodeSuccess, getCouponCodeError } = allCouponCodeSlice.actions;

// Export reducer để nhúng vào Store
export default allCouponCodeSlice.reducer;