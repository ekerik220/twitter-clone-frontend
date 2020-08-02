import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["comment"] = {
  modalOpen: false,
  tweet: null,
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clickedCommentButton: (state, action: PayloadAction<Tweet>) => {
      state.modalOpen = true;
      state.tweet = action.payload;
    },
    closedCommentModal: () => initialState,
  },
});

export const { clickedCommentButton, closedCommentModal } = slice.actions;

export default slice.reducer;
