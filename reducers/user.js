import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: null,
<<<<<<< HEAD
    user: null,
    photos: [],
=======
    userId: null,
    all: [],
>>>>>>> 6a517d62a05704d4e34b9bd6575bad5288d3a26e
  },
};
export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.value.type = action.payload;
    },
<<<<<<< HEAD
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
=======
    addUserId: (state, action) => {
      state.value.userId = action.payload;
    },
    allChilds: (state, value) => {
      state.value.all.push(action.payload);
    },
  },
});
export const { setUserType, addUserId, allChilds } = UserSlice.actions;
>>>>>>> 6a517d62a05704d4e34b9bd6575bad5288d3a26e
export default UserSlice.reducer;
