import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import videoReducer from "./videoSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// REDUX PERSIST it allows you to save the Redux state to a storage mechanism (such as local storage, session storage, or even more advanced storage solutions) so that the state persists across page reloads. When the application is restarted, the persisted state is rehydrated back into the Redux store.

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: userReducer, video: videoReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
// in the store the options will be provided are name with reducer
// name: reducer
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     video: videoReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;

// Storage
// -- user
// --- CurrentUser,loading,error
