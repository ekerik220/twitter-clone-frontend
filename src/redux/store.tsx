import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import signup from "./slices/signupSlice";
import user from "./slices/userSlice";
import imageEditor from "./slices/imageEditorSlice";
import globalUI from "./slices/globalUISlice";
import comment from "./slices/commentSlice";
import retweet from "./slices/retweetSlice";

// Make the root reducer
const rootReducer = combineReducers({
  signup,
  user,
  imageEditor,
  globalUI,
  comment,
  retweet,
});

// Set up redux persist
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
