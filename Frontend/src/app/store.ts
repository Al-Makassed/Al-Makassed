import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import appSettingsReducer from "../features/appSettings/appSettingsSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    appSettings: appSettingsReducer,
    snackbar: snackbarReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
