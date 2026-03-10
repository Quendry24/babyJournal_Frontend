import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: null,
    user: null,
    photos: [],
    userId: null,
    all: [],
    today: [],
    idFamille: null,
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
    addUserId: (state, action) => {
      state.value.userId = action.payload;
    },
    getAllChilds: (state, action) => {
      state.value.all = action.payload;
    },
    getTodayChilds: (state, action) => {
      state.value.today = action.payload;
    },

    famille: (state, action) => {
      state.value.idFamille = action.payload;
    },
    // login: (state, action) => {
    //   console.log("user dans reducer", action.payload);
    //   state.value.email = action;
    // },
  },
});
export const {
  setUserType,
  addUserId,
  getAllChilds,
  getTodayChilds,
  addPhoto,
  removePhoto,
  famille,
} = UserSlice.actions;
export default UserSlice.reducer;
