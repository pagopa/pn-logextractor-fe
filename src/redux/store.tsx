import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from "./snackbarSlice";
import responseReducer from "./responseSlice";
import spinnerReducer from "./spinnerSlice";

export const store = configureStore({
  reducer: {
      response: responseReducer,
      snackbar: snackbarReducer,
      spinner: spinnerReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch