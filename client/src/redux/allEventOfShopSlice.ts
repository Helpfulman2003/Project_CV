import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEventOfShop: {
    currentEventOfShop: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allEventOfShopSlice = createSlice({
  name: "allEventOfShop",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getEventOfShopStart: (state) => {
      state.allEventOfShop.isFetching = true
    },
    getEventOfShopSuccess: (state, action) => {
      state.allEventOfShop.isFetching = false
      state.allEventOfShop.currentEventOfShop = action.payload
      state.allEventOfShop.error = false
    },
    getEventOfShopError: (state) => {
      state.allEventOfShop.isFetching = false
      state.allEventOfShop.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getEventOfShopStart, getEventOfShopSuccess, getEventOfShopError } = allEventOfShopSlice.actions;

// Export reducer để nhúng vào Store
export default allEventOfShopSlice.reducer;