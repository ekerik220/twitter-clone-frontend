import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["signup"] = {
  userInfo: {
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
    trackBrowsing: true,
    id: "",
  },
  currentPage: 1,
  currentPageValidated: false,
  focusedField: "name",
  shouldTryCode: false,
  shouldTryPassword: false,
  modalOpen: false,
};

const slice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupStarted: (state) => {
      state.modalOpen = true;
    },
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
      state.currentPage = 1;
    },
    userWantsToChangeEmail: (state) => {
      state.focusedField = "email";
      state.currentPage = 1;
    },
    userWantsToChangeBirthday: (state) => {
      state.focusedField = "month";
      state.currentPage = 1;
    },
    wentBackOnePage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        state.focusedField = "name";
      }
    },
    wentForwardOnePage: (state) => {
      if (state.currentPage === 4) state.shouldTryCode = true;
      if (state.currentPage === 5) state.shouldTryPassword = true;
      if (state.currentPage < 4) state.currentPage += 1;
    },
    submittedUserInformation: (state, action: PayloadAction<string>) => {
      state.currentPage = 4;
      state.userInfo.id = action.payload;
    },
    triedCode: (state) => {
      state.shouldTryCode = false;
    },
    codeWasValid: (state) => {
      state.currentPage = 5;
    },
    createdAccount: () => initialState,
  },
});

export const {
  signupStarted,
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
  userWantsToChangeBirthday,
  userWantsToChangeEmail,
  userWantsToChangeName,
  submittedUserInformation,
  triedCode,
  codeWasValid,
  createdAccount,
} = slice.actions;

export default slice.reducer;
