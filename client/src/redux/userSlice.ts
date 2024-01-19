import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    currentUser: {},
    isFetching: false,
    error: false
  }
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.user.isFetching = false
      state.user.currentUser = action.payload
      state.user.error = false
    },
    loginError: (state) => {
      state.user.isFetching = false
      state.user.error = true
    },
    logOutSuccess: (state, action) => {
      state.user.isFetching = false
      state.user.currentUser = {}
      state.user.error = false
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { loginStart, loginSuccess, loginError, logOutSuccess } = userSlice.actions;

// Export reducer để nhúng vào Store
export default userSlice.reducer;