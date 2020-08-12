import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["imageEditor"] = {
  open: false,
  file: "",
  heightDivider: 1,
  target: "",
};

type PayloadType = {
  file: string;
  target: string;
};

const slice = createSlice({
  name: "imageEditor",
  initialState,
  reducers: {
    openedImageEditor: (state, action: PayloadAction<PayloadType>) => {
      state.file = action.payload.file;
      state.target = action.payload.target;
      state.open = true;
    },
    openedLandscapeImageEditor: (state, action: PayloadAction<PayloadType>) => {
      state.file = action.payload.file;
      state.target = action.payload.target;
      state.heightDivider = 3;
      state.open = true;
    },
    finishedEditingImage: () => initialState,
  },
});

export const {
  openedImageEditor,
  openedLandscapeImageEditor,
  finishedEditingImage,
} = slice.actions;

export default slice.reducer;
