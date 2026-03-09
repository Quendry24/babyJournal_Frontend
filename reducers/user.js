import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    type: null,
    userId: null,
    all: [],
    today: [],
  },
};
export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.value.type = action.payload;
    },
    addUserId: (state, action) => {
      state.value.userId = action.payload;
    },
    getAllChilds: (state, action) => {
      state.value.all = action.payload;
    },
    getTodayChilds: (state, action) => {
      state.value.today = action.payload;
    },
  },
});
export const { setUserType, addUserId, getAllChilds, getTodayChilds } =
  UserSlice.actions;
export default UserSlice.reducer;
