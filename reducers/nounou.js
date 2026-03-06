import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    token: null,
  },
};

export const nounouSlice = createSlice({
  name: "nounou",
  initialState,
  reducers: {
    nounouToStore: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },

    logout: (state) => {
      state.value.email = null;
      state.value.token = null;
    },
  },
});

export const { nounouToStore, logout } = nounouSlice.actions;
export default nounouSlice.reducer;
