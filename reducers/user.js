import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: [] };
export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addFriendToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});
export const { addFriendToStore } = UserSlice.actions;
export default UserSlice.reducer;
