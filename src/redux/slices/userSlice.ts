import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["user"] = {
  token: null,
  avatar: "",
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
