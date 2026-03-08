import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: null,
    user: null,
    photos: [],
  },
};
export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.value.type = action.payload;
    },
    addPhoto: (state, action) => {
      console.log(state.value.photos.length, "photo reçue", action.payload);
      //state.value.photos = [];
      state.value.photos.push(action.payload);
      console.log(state.value.photos, "deuxieme");
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload,
      );
    },
  },
});
export const { setUserType, addPhoto, removePhoto } = UserSlice.actions;
export default UserSlice.reducer;
