import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState["globalUI"] = {
  tooltipOpen: false,
};

const slice = createSlice({
  name: "globalUI",
  initialState,
  reducers: {
    tooltipWasOpened: (state) => {
      state.tooltipOpen = true;
    },
    tooltipWasClosed: (state) => {
      state.tooltipOpen = false;
    },
  },
});

export const { tooltipWasClosed, tooltipWasOpened } = slice.actions;

export default slice.reducer;
