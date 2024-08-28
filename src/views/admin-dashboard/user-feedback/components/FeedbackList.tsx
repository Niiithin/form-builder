import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./index.style";
import { Answer } from "..";
import { formatDate } from "utility/formatDate";

interface FeedbackProps {
  feedback: {
    id: string;
    answers: Answer[];
    createdDate: string;
  };
  index: number;
}

function FeedbackAccordian({ feedback, index }: FeedbackProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={styles.accordianHeading}
        >
          <Typography>Feedback {index + 1}</Typography>
          <Typography>{formatDate(feedback.createdDate)}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "white" }}>
        <Stack spacing={2}>
          {feedback.answers.map((answer) => (
            <Box key={answer.id}>
              <Typography variant="subtitle1" fontWeight="bold">
                {answer.label}
              </Typography>
              <Typography>{answer.answer.toString()}</Typography>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default FeedbackAccordian;
