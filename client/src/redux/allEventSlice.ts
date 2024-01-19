import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvent: {
    currentEvent: [],
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const allEventSlice = createSlice({
  name: "allEvent",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    getEventStart: (state) => {
      state.allEvent.isFetching = true
    },
    getEventSuccess: (state, action) => {
      state.allEvent.isFetching = false
      state.allEvent.currentEvent = action.payload
      state.allEvent.error = false
    },
    getEventError: (state) => {
      state.allEvent.isFetching = false
      state.allEvent.error = true
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { getEventStart, getEventSuccess, getEventError } = allEventSlice.actions;

// Export reducer để nhúng vào Store
export default allEventSlice.reducer;