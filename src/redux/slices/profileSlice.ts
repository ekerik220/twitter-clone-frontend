import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["profile"] = {
  currentCategory: "tweets",
  modalOpen: false,
  profileImg: "",
  avatarImg: "",
  bio: "",
  username: "",
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clickedTweetsButton: (state) => {
      state.currentCategory = "tweets";
    },
    clickedMediaButton: (state) => {
      state.currentCategory = "media";
    },
    clickedLikesButton: (state) => {
      state.currentCategory = "likes";
    },
    openedEditProfileModal: (state, action: PayloadAction<User>) => {
      state.profileImg = action.payload.profileImg;
      state.avatarImg = action.payload.avatar;
      state.bio = action.payload.bio;
      state.username = action.payload.username;
      state.modalOpen = true;
    },
    closedEditProfileModal: (state) => {
      state.modalOpen = false;
    },
    profileImgSelected: (state, action: PayloadAction<string>) => {
      state.profileImg = action.payload;
    },
    avatarImgSelected: (state, action: PayloadAction<string>) => {
      state.avatarImg = action.payload;
    },
    updatedUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updatedBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
  },
});

export const {
  clickedTweetsButton,
  clickedMediaButton,
  clickedLikesButton,
  openedEditProfileModal,
  closedEditProfileModal,
  profileImgSelected,
  avatarImgSelected,
  updatedUsername,
  updatedBio,
} = slice.actions;

export default slice.reducer;
