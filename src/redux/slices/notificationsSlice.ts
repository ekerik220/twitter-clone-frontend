import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState["notifications"] = {
  currentCategory: "notifications",
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clickedNotificationsButton: (state) => {
      state.currentCategory = "notifications";
    },
    clickedMentionsButton: (state) => {
      state.currentCategory = "mentions";
    },
    leavingNotificationScreen: () => initialState,
  },
});

export const {
  clickedNotificationsButton,
  clickedMentionsButton,
  leavingNotificationScreen,
} = slice.actions;

export default slice.reducer;
