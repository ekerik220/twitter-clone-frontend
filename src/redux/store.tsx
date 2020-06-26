import { configureStore, combineReducers } from "@reduxjs/toolkit";

// TODO: Import reducers

const reducer = combineReducers({
  // Add reducers here
});

export const store = configureStore({
  reducer: reducer,
});
