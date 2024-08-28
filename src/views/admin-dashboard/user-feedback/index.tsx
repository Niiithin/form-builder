import React, { useEffect, useState } from "react";
import { RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "config/firebase";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./index.style";
import FeedbackAccordian from "./components/FeedbackList";
import {
  convertTimestampToDate,
  extractDate,
  extractTime,
  formatDate,
  getDate,
  getTime,
} from "utility/formatDate";

// Define interfaces
export interface Answer {
  answer: string | number;
  id: number;
  label: string;
  required: boolean;
  type: string;
}

interface Feedback {
  id: string;
  answers: Answer[];
  createdDate: string;
}

const UserFeedback = () => {
  const feedbackId = useSelector((state: RootState) => state.feedback.id);
  const feedbackTitle = useSelector((state: RootState) => state.feedback.title);
  const feedbackURL = useSelector((state: RootState) => state.feedback.url);
  const feedbackViewed = useSelector(
    (state: RootState) => state.feedback.viewCount
  );
  const feedbackDate = useSelector((state: RootState) => state.feedback.date);
  console.log(feedbackDate, "title");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const getFeedbacks = async (id: string) => {
    try {
      const formDoc = doc(db, "forms", id);
      const feedbackCollection = collection(formDoc, "feedbacks");
      const querySnapshot = await getDocs(feedbackCollection);
      const allFeedbacks: Feedback[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        answers: doc.data().answers,
        createdDate: doc.data().createdDate,
      }));
      setFeedbacks(allFeedbacks);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(feedbacks, "feedbaks");
  useEffect(() => {
    if (feedbackId) {
      getFeedbacks(feedbackId);
    }
  }, [feedbackId]);

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.titleBox}>
        <Typography variant="h5" sx={styles.title}>
          {feedbackTitle}
        </Typography>
        <Typography variant="h5" sx={styles.title}>
          {getDate(feedbackDate)}
        </Typography>
      </Box>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        sx={styles.viewContainer}
        gap={20}
      >
        <Box>
          <Typography variant="h2" sx={styles.views}>
            {feedbackViewed}
          </Typography>
          <Typography sx={styles.viewsTitle} variant="subtitle2">
            VIEWS
          </Typography>
        </Box>
        <Box>
          <Typography sx={styles.views} variant="h2">
            {feedbacks.length}
          </Typography>
          <Typography sx={styles.viewsTitle} variant="subtitle2">
            Submitted
          </Typography>
        </Box>
      </Stack>
      <Box mb={2}>
        <Typography sx={styles.views} variant="subtitle1">
          Page URL contains {feedbackURL}
        </Typography>
        <Typography sx={styles.views} variant="subtitle1">
          Date: {getDate(feedbackDate)}
        </Typography>
        <Typography sx={styles.views} variant="subtitle1">
          Time: {getTime(feedbackDate)}
        </Typography>
      </Box>
      {feedbacks.map((feedback, id) => (
        <Box mb={2}>
          <FeedbackAccordian feedback={feedback} index={id} />
        </Box>
      ))}
    </Box>
  );
};

export default UserFeedback;
