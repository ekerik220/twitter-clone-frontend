import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signup from "./slices/signupSlice";
import user from "./slices/userSlice";
import imageEditor from "./slices/imageEditorSlice";

const reducer = combineReducers({
  signup,
  user,
  imageEditor,
});

export const store = configureStore({
  reducer: reducer,
});
