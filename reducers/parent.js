import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    token: null,
  },
};

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    parentToStore: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },

    logout: (state) => {
      state.value.email = null;
      state.value.token = null;
    },
  },
});

export const { parentToStore, logout } = parentSlice.actions;
export default parentSlice.reducer;
