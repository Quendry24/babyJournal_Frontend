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
    infos: {},
    login: null,
    logout: null,
    famille: null,
    idFamille,
    isConnected: false,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.value.type = action.payload;
    },

    userId: (state, action) => {
      state.value.type = action.payload;
    },

    login: (state, action) => {
      state.value.login = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
    infos: (state, action) => {
      state.value.infos = action.payload;
    },
    addPhoto: (state, action) => {
      console.log(state.value.photos.length, "photo reçue", action.payload);
      if (!state.value.photos) {
        state.value.photos = [];
      }
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
      state.value.today = [];
      state.value.today = action.payload;
    },
    setIdFamille: (state, action) => {
      state.value.idFamille = action.payload;
    },
    famille: (state, action) => {
      state.value.famille = action.payload;
    },
  },
});

export const {
  setUserType,
  addUserId,
  getAllChilds,
  getTodayChilds,
  addPhoto,
  addPhoto2,
  removePhoto,
  login,
  logout,
  infos,
  idFamille,
  famille,
  setIdFamille,
} = UserSlice.actions;
export default UserSlice.reducer;
