import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "signup",
  initialState: {
    userInfo: {
      name: "",
      email: "",
      month: "",
      day: "",
      year: "",
      trackBrowsing: true,
    },
    currentPageValidated: false,
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.userInfo.name = action.payload;
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.userInfo.email = action.payload;
    },
    monthChanged: (state, action: PayloadAction<string>) => {
      state.userInfo.month = action.payload;
    },
    dayChanged: (state, action: PayloadAction<string>) => {
      state.userInfo.day = action.payload;
    },
    yearChanged: (state, action: PayloadAction<string>) => {
      state.userInfo.year = action.payload;
    },
    currentPageIsValid: (state) => {
      state.currentPageValidated = true;
    },
    currentPageIsInvalid: (state) => {
      state.currentPageValidated = false;
    },
    trackBrowsingWasChanged: (state, action: PayloadAction<boolean>) => {
      state.userInfo.trackBrowsing = action.payload;
    },
  },
});

export const {
  nameChanged,
  emailChanged,
  monthChanged,
  dayChanged,
  yearChanged,
  currentPageIsInvalid,
  currentPageIsValid,
  trackBrowsingWasChanged,
} = slice.actions;

export default slice.reducer;
