import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["user"] = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWE0ODFlNzhhOGY1NzAxN2YwNWQ1OSIsImlhdCI6MTU5NTU1ODYxMn0.IO2uN0S5Fq4z08t2XDeIKtkCRCMVuEDICOaCre8Z8I0",
  avatar:
    "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    userLoggedOut: (state) => {
      state.token = null;
    },
    userSetNewAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userSetNewAvatar } = slice.actions;

export default slice.reducer;
