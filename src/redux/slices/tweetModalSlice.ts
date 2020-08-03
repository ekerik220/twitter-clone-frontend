import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState["tweetModal"] = {
  modalOpen: false,
};

const slice = createSlice({
  name: "tweetModal",
  initialState,
  reducers: {
    clickedTweetButton: (state) => {
      state.modalOpen = true;
    },
    closedTweetModal: () => initialState,
  },
});

export const { clickedTweetButton, closedTweetModal } = slice.actions;

export default slice.reducer;
