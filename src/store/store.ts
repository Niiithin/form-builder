import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import feedbackReducer from "./feedbackSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
