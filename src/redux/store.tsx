import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signup from "./slices/signupSlice";

const reducer = combineReducers({
  signup,
});

export const store = configureStore({
  reducer: reducer,
});
