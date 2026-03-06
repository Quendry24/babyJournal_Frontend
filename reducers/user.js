import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    type: null,
    userId: null,
    all: [],
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
    allChilds: (state, value) => {
      state.value.all.push(action.payload);
    },
  },
});
export const { setUserType, addUserId, allChilds } = UserSlice.actions;
export default UserSlice.reducer;
