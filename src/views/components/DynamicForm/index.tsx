import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "config/firebase";
import { CustomIcon } from "models/models";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import styles from "./index.style";
interface FormField {
  id: number;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
  errorMessage?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  id: string;
  title: string;
}

const customIcons: { [index: number]: CustomIcon } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

const IconContainer = (props: any) => {
  const { value, ...other } = props;
  return (
    <span {...other}>
      {React.cloneElement(customIcons[value].icon, {
        style: { width: 40, height: 40 },
      })}
    </span>
  );
};

const StyledErrorMessage = ({ name }: { name: string }) => (
  <ErrorMessage
    name={name}
    render={(msg) => (
      <Typography color="error" variant="subtitle2" sx={{ mt: 1 }}>
        {msg}
      </Typography>
    )}
  />
);
const renderFormField = (field: FormField, formik: any): JSX.Element | null => {
  switch (field.type) {
    case "Text Area":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {field.label}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name={field.id.toString()}
            value={formik.values[field.id]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    case "Numeric Rating":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">{field.label}</Typography>
          <Box sx={{ display: "flex", mt: 1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <Button
                key={number}
                variant={
                  formik.values[field.id] === number ? "contained" : "outlined"
                }
                sx={{
                  minWidth: "36px",
                  height: "36px",
                  p: 0,
                  borderRadius: 0,
                  borderRight: number === 10 ? 1 : 0,
                  borderColor: "black",
                  color: formik.values[field.id] === number ? "white" : "black",
                  backgroundColor:
                    formik.values[field.id] === number
                      ? "primary.main"
                      : "transparent",
                }}
                onClick={() =>
                  formik.setFieldValue(field.id.toString(), number)
                }
              >
                {number}
              </Button>
            ))}
          </Box>
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    case "Star Rating":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">{field.label}</Typography>
          <Rating
            name={field.id.toString()}
            value={formik.values[field.id]}
            onChange={(event, newValue) =>
              formik.setFieldValue(field.id.toString(), newValue)
            }
            sx={{ fontSize: "2rem" }}
          />
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    case "Smiley Rating":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">{field.label}</Typography>
          <Rating
            name={field.id.toString()}
            value={formik.values[field.id]}
            IconContainerComponent={IconContainer}
            onChange={(event, newValue) => {
              formik.setFieldValue(field.id.toString(), newValue);
            }}
            sx={{
              fontSize: "2rem",
              "& .MuiRating-icon": {
                color: "grey.300",
              },
              "& .MuiRating-iconFilled": {
                color: "primary.main",
              },
              "& .MuiRating-iconHover": {
                color: "primary.light",
              },
            }}
          />
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    case "Single Line Input":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {field.label}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            name={field.id.toString()}
            value={formik.values[field.id]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    case "Radio Button":
      return (
        <FormControl key={field.id} component="fieldset" sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">{field.label}</Typography>
          <RadioGroup
            row
            aria-label="options"
            name={field.id.toString()}
            value={formik.values[field.id]}
            onChange={formik.handleChange}
          >
            {field.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <StyledErrorMessage name={field.id.toString()} />
        </FormControl>
      );
    case "Categories":
      return (
        <Box key={field.id} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {field.label}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {field.options?.map((option, index) => (
              <Button
                key={index}
                variant={
                  formik.values[field.id] === option ? "contained" : "outlined"
                }
                sx={{
                  minWidth: "120px",
                  height: "40px",
                  p: 1,
                  borderRadius: 4,
                  borderColor: "black",
                  color: "black",
                }}
                onClick={() =>
                  formik.setFieldValue(field.id.toString(), option)
                }
              >
                {option}
              </Button>
            ))}
          </Box>
          <StyledErrorMessage name={field.id.toString()} />
        </Box>
      );
    default:
      return null;
  }
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, id, title }) => {
  const [open, setOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const formStatus = localStorage.getItem(`formStatus_${id}`);
    if (formStatus === "closed" || formStatus === "submitted") {
      setOpen(false);
    }
  }, [id]);

  const initialValues = fields?.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {} as Record<number, string>);

  const validationSchema = Yup.object().shape(
    fields?.reduce((acc, field) => {
      if (field.required) {
        acc[field.id] = Yup.string().required(
          field.errorMessage || "This field is required"
        );
      }
      return acc;
    }, {} as Record<number, Yup.StringSchema>)
  );

  const handleSubmit = async (values: any) => {
    const formDoc = doc(db, "forms", id);
    const feedbackCollection = collection(formDoc, "feedbacks");
    const newFeedback = {
      createdDate: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
      answers: fields.map((field) => ({
        id: field.id,
        label: field.label,
        type: field.type,
        answer: values[field.id],
        required: field.required,
      })),
    };
    const docRef = await addDoc(feedbackCollection, newFeedback);
    console.log(docRef, "doc");
    setSubmitted(true);
    localStorage.setItem(`formStatus_${id}`, "submitted");
    setOpen(false);
  };

  const handleClose = () => {
    if (!submitted) {
      localStorage.setItem(`formStatus_${id}`, "closed");
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "500px",
          height: "500px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={styles.titleContainer}>
          <Typography variant="h4" sx={styles.formTitle}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            onClick={handleClose}
            aria-label="close"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  paddingX: 2,
                  width: "500px",
                  paddingY: 1,
                  flex: 1,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                {fields?.map((field) => (
                  <Box key={field.id} sx={styles.formBox}>
                    {renderFormField(field, formik)}
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 2,
                  backgroundColor: "white",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default DynamicForm;
