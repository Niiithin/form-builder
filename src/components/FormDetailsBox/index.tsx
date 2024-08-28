import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "config/firebase";
import { AppDispatch } from "store/store";
import {
  setFeedbackDate,
  setFeedbackId,
  setFeedbackTitle,
  setFeedbackURL,
  setFeedbackViewCount,
} from "store/feedbackSlice";
import ConfirmDialog from "components/Dialog/ConfirmDialog";
import { convertTimestampToDate, FormDate, getDate } from "utility/formatDate";
import { showToast } from "utility/toast";
import { toastMessages } from "constants/appConstants";
import styles from "./index.style";

interface FormDetailsBoxProps {
  id: string;
  onFormDeleted: () => void;
  title: string;
  date?: FormDate;
  url: string;
  createdDate: string;
  submitted?: number;
  viewed?: number;
}

const FormDetailsBox: React.FC<FormDetailsBoxProps> = ({
  id,
  title,
  url,
  submitted,
  date,
  viewed,
  createdDate,
  onFormDeleted,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleViewSubmissions = (feedbackId: string) => {
    dispatch(setFeedbackId(feedbackId));
    dispatch(setFeedbackTitle(title));
    dispatch(setFeedbackURL(url));
    if (createdDate) {
      dispatch(setFeedbackDate(createdDate));
    }
    dispatch(setFeedbackViewCount(viewed || 0));
    navigate(`/user-feedback`);
  };

  const handleEditForm = (feedbackId: string) => {
    dispatch(setFeedbackId(feedbackId));
    navigate(`/create-form`);
  };

  const handleFormDelete = async (formId: string) => {
    try {
      const formDocRef = doc(db, "forms", formId);
      await deleteDoc(formDocRef);
      onFormDeleted();
      showToast(toastMessages.success.form.deleted, "success");
    } catch (error) {
      console.error("Error deleting form: ", error);
    }
    handleClose();
  };

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <ConfirmDialog
        open={openDialog}
        description="Are you sure you want to delete this form?"
        agreeText="OK"
        disagreeText="Cancel"
        disagreeButton={true}
        onAgreeAction={() => handleFormDelete(id)}
        onDisAgreeAction={handleClose}
      />
      <Box sx={styles.mainContainer}>
        <Box sx={styles.image}>
          <Box
            component="img"
            alt="i"
            src={"/assets/svg/survey.svg"}
            height={48}
            width={48}
          />
        </Box>
        <Box sx={{ paddingX: 2 }}>
          <Typography variant="h4" mb={2}>
            <b>{title}</b>
          </Typography>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle2" sx={styles.textHeading}>
              Submitted
            </Typography>
            <Typography variant="subtitle2" sx={styles.textDesc}>
              {submitted}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle2" sx={styles.textHeading}>
              Viewed
            </Typography>
            <Typography variant="subtitle2" sx={styles.textDesc}>
              {viewed}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle2" sx={styles.textHeading}>
              Date Published
            </Typography>
            {createdDate ? (
              <Typography variant="subtitle2" sx={styles.textDesc}>
                {getDate(createdDate)}
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={styles.textDesc}>
                -
              </Typography>
            )}
          </Stack>
        </Box>
        <Box sx={{ margin: "0 auto" }}>
          <Button
            sx={{
              ...styles.button,
              backgroundColor: "#9C27B0",
              "&:hover": {
                backgroundColor: "#7B1FA2",
              },
              textAlign: "center",
            }}
            onClick={() => handleViewSubmissions(id)}
          >
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              VIEW SUBMISSION
            </Typography>
          </Button>
          <Stack
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
            mt={2}
            mb={2}
          >
            <Button
              sx={{
                ...styles.button,
                backgroundColor: "#2E7D32",
                "&:hover": {
                  backgroundColor: "#1B5E20",
                },
              }}
              onClick={() => handleEditForm(id)}
            >
              <Typography variant="subtitle2" sx={{ color: "white" }}>
                EDIT
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.button,
                backgroundColor: "#2196F3",
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
              onClick={handleOpen}
            >
              <Typography variant="subtitle2" sx={{ color: "white" }}>
                DELETE
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default FormDetailsBox;
