import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState["listModal"] = {
  open: false,
  page: 1,
  pageTwoCategory: "suggested",
  img: "",
  listID: "",
  editMode: false,
  name: "",
  description: "",
};

const slice = createSlice({
  name: "listModal",
  initialState,
  reducers: {
    imageSelected: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
    updatedName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updatedDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    nextButtonClicked: (state) => {
      state.page = 2;
    },
    clickedSuggestedButton: (state) => {
      state.pageTwoCategory = "suggested";
    },
    clickedMembersButton: (state) => {
      state.pageTwoCategory = "members";
    },
    listIDChanged: (state, action: PayloadAction<string>) => {
      state.listID = action.payload;
    },
    openedListModal: (state) => {
      state.open = true;
    },
    openedEditListModal: (state, action: PayloadAction<List>) => {
      state.name = action.payload.name;
      state.description = action.payload.description || "";
      state.img = action.payload.img || "";
      state.listID = action.payload.id;
      state.editMode = true;
      state.open = true;
    },
    closedListModal: (state) => initialState,
  },
});

export const {
  imageSelected,
  nextButtonClicked,
  clickedMembersButton,
  clickedSuggestedButton,
  openedListModal,
  closedListModal,
  listIDChanged,
  updatedDescription,
  updatedName,
  openedEditListModal,
} = slice.actions;

export default slice.reducer;
