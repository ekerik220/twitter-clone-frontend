import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["explore"] = {
  currentCategory: "trending",
  searchTerm: "",
  onExploreScreen: false,
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
    enteringExploreScreen: (state) => {
      state.onExploreScreen = true;
    },
    leavingExploreScreen: () => initialState,
  },
});

export const {
  clickedSearchButton,
  clickedTrendingButton,
  updatedSearchTerm,
  leavingExploreScreen,
  enteringExploreScreen,
} = slice.actions;

export default slice.reducer;
