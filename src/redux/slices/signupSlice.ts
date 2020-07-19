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
    currentPage: 1,
    currentPageValidated: false,
    focusedField: "name",
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
    userWantsToChangeName: (state) => {
      state.focusedField = "name";
    },
    userWantsToChangeEmail: (state) => {
      state.focusedField = "email";
    },
    userWantsToChangeBirthday: (state) => {
      state.focusedField = "month";
    },
    wentBackOnePage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        state.focusedField = "name";
      }
    },
    wentForwardOnePage: (state) => {
      if (state.currentPage < 5) state.currentPage += 1;
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
  wentBackOnePage,
  wentForwardOnePage,
} = slice.actions;

export default slice.reducer;
