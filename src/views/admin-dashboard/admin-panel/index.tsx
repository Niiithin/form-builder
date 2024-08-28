import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeForm, setFormTitle } from "store/formSlice";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "config/firebase";
import { QueryDocumentSnapshot } from "firebase/firestore";
import FormDetailsBox from "components/FormDetailsBox";
import { setFeedbackId } from "store/feedbackSlice";

// Interface for form field
interface FormField {
  id: number;
  label: string;
  type: string;
  options: string[];
  required: boolean;
}

// Interface for form data
interface FormData {
  fields: FormField[];
  isDirty: boolean;
  isPublished: boolean;
}

// Interface for individual form
interface Form {
  id: string;
  title: string;
  date: any;
  description: string;
  viewCount: number;
  submissionCount: number;
  form: FormData;
  url: string;
}

function AdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allForms, setAllForms] = useState<Form[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>("");
  console.log(allForms, "forms");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    dispatch(initializeForm());
    dispatch(setFormTitle(formName));
    navigate("/create-form");

    handleClose();
  };

  const fetchForms = async () => {
    try {
      const formsCollection = collection(db, "forms");
      const querySnapshot = await getDocs(formsCollection);
      const forms: Form[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        console.log(data, "data");
        forms.push({
          id: doc.id,
          title: data.formTitle,
          url: data.formURL,
          date: data.formDate,
          description: data.description,
          viewCount: data.viewCount,
          submissionCount: data.submissionCount,
          form: data.form,
        });
      });
      setAllForms(forms);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allForms, "forms");

  useEffect(() => {
    fetchForms();
    dispatch(setFeedbackId(""));
  }, []);

  const handleFormDeleted = () => {
    fetchForms();
  };
  return (
    <>
      <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.title}>
          Admin Panel
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"} gap={4}>
          <Box onClick={handleOpen} sx={styles.formContainer}>
            <Box
              component="img"
              alt="i"
              src={"/assets/svg/plus_icon.svg"}
              pr={1}
            />
            <Typography>New Form</Typography>
          </Box>
          {allForms.map((form) => (
            <FormDetailsBox
              key={form.id}
              id={form.id}
              title={form.title}
              url={form.url}
              submitted={form.submissionCount}
              viewed={form.viewCount}
              date={form.date}
              onFormDeleted={handleFormDeleted}
            />
          ))}
        </Stack>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2">
            Enter Form Name
          </Typography>
          <TextField
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleSubmit} sx={styles.button}>
            OK
          </Button>
          <Button onClick={handleClose} sx={styles.cancelButton}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AdminPanel;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  formContainer: (theme: any) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    height: "350px",
    width: "250px",
  }),
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  button: (theme: any) => ({
    backgroundColor: theme.palette.primary.main,
    paddingX: theme.spacing(2),
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
  }),
  cancelButton: (theme: any) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,

    paddingX: theme.spacing(2),
  }),
};
