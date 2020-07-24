import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["imageEditor"] = {
  open: false,
  file: "",
};

const slice = createSlice({
  name: "imageEditor",
  initialState,
  reducers: {
    openedImageEditor: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
      state.open = true;
    },
    finishedEditingImage: () => initialState,
  },
});

export const { openedImageEditor, finishedEditingImage } = slice.actions;

export default slice.reducer;
