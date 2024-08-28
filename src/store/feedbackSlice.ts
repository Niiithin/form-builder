import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback } from "models/models";
import { FormDate } from "utility/formatDate";

interface User {
  id: string;
  url: string;
  title: string;
  viewCount: number;
  date: string;
  time: string;
}

const initialState: Feedback = {
  id: "",
  url: "",
  title: "",
  viewCount: 0,
  date: "",
  time: "",
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setFeedbackTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setFeedbackURL: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setFeedbackViewCount: (state, action: PayloadAction<number>) => {
      state.viewCount = action.payload;
    },
    setFeedbackDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setFeedbackTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
  },
});

export const {
  setFeedbackId,
  setFeedbackTitle,
  setFeedbackURL,
  setFeedbackViewCount,
  setFeedbackDate,
  setFeedbackTime,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
