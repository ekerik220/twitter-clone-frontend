import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["explore"] = {
  currentCategory: "trending",
  searchTerm: "",
};

const slice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    clickedTrendingButton: (state) => {
      state.currentCategory = "trending";
    },
    clickedSearchButton: (state) => {
      state.currentCategory = "search";
    },
    updatedSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentCategory = "search";
    },
  },
});

export const {
  clickedSearchButton,
  clickedTrendingButton,
  updatedSearchTerm,
} = slice.actions;

export default slice.reducer;
