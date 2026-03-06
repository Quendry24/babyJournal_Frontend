import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    type: null,
    user: null,
  },
};
export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.value.type = action.payload;
    },
  },
});
export const { setUserType } = UserSlice.actions;
export default UserSlice.reducer;
