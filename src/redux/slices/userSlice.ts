import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import { client } from "index";

const initialState: RootState["user"] = {
  token: null,
  userID: "",
  avatar: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      const userID = jwt.decode(action.payload) as { [key: string]: string };
      state.token = action.payload;
      state.userID = userID.id;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.userID = "";
      state.avatar = "";
      // reset apollo cache
      client.cache.reset();
    },
    userSetNewAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userSetNewAvatar } = slice.actions;

export default slice.reducer;
