import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["retweet"] = {
  modalOpen: false,
  tweet: null,
};

const slice = createSlice({
  name: "retweet",
  initialState,
  reducers: {
    clickedRetweetCommentButton: (state, action: PayloadAction<Tweet>) => {
      state.modalOpen = true;
      state.tweet = action.payload;
    },
    closedRetweetModal: () => initialState,
  },
});

export const {
  clickedRetweetCommentButton,
  closedRetweetModal,
} = slice.actions;

export default slice.reducer;
