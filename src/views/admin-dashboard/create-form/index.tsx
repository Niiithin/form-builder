import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Rating,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import { db } from "config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import Sidebar from "./components/SideBar";
import { getDefaultLabel, toastMessages } from "constants/appConstants";
import { AppDispatch, RootState } from "store/store";
import { CustomIcon, FormField } from "models/models";
import {
  addField,
  deleteField,
  initializeForm,
  saveForm,
  updateField,
  publishForm,
  setFormTitle,
  populateForm,
} from "store/formSlice";
import { showToast } from "utility/toast";
import EditFieldSidebar from "./components/EditSidebar";
import Header from "./components/Header";
import styles from "./index.style";

const CreateForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const id = useSelector((state: RootState) => state.feedback.id);

  const formFields = useSelector((state: RootState) => state.form.fields);
  const isDirty = useSelector((state: RootState) => state.form.isDirty);
  const isPublished = useSelector((state: RootState) => state.form.isPublished);
  const formTitle = useSelector((state: RootState) => state.form.formTitle);
  const formDate = useSelector((state: RootState) => state.form.formDate);
  const formTime = useSelector((state: RootState) => state.form.formTime);
  const formURL = useSelector((state: RootState) => state.form.formURL);

  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(formTitle);

  useEffect(() => {
    setTempTitle(formTitle);
  }, [formTitle]);

  useEffect(() => {
    if (id) {
      fetchFormDetails(id);
    }
  }, [id]);

  const fetchFormDetails = async (formId: string) => {
    try {
      const formDocRef = doc(db, "forms", formId);
      const formDocSnap = await getDoc(formDocRef);

      if (formDocSnap.exists()) {
        const formData = formDocSnap.data();
        console.log(formData, "data");
        const formState = {
          fields: formData.form.fields,
          isDirty: false,
          isPublished: formData.form.isPublished,
          formTitle: formData.formTitle,
          formURL: formData.formURL,
          formDate: formData.formDate
            ? new Date(formData.formDate.toDate()).toISOString().split("T")[0]
            : "",
          formTime: formData.formDate
            ? new Date(formData.formDate.toDate())
                .toISOString()
                .split("T")[1]
                .slice(0, 5)
            : "",
          urlCondition: !!formData.formURL,
          specificDate: !!formData.formDate,
          specificTime: !!formData.formDate,
        };
        dispatch(populateForm(formState));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting form details: ", error);
    }
  };
  const addFormField = (fieldType: string): void => {
    if (formFields.length < 7) {
      // Check for max fields
      dispatch(
        addField({
          type: fieldType,
          id: Date.now(),
          label: getDefaultLabel(fieldType),
          required: false,
        })
      );
    } else {
      alert("You can add a maximum of 7 fields.");
    }
  };

  const deleteFormField = (id: number): void => {
    dispatch(deleteField(id));
  };

  const startEditing = (field: FormField): void => {
    setEditingField(field);
  };

  const updateFormField = (updatedField: FormField): void => {
    dispatch(updateField(updatedField));
    setEditingField(null);
  };

  const handleSave = () => {
    if (formFields.length >= 1) {
      // Ensure minimum 1 field before saving
      dispatch(saveForm());
    } else {
      alert("You need to have at least one field in the form.");
    }
  };

  const handlePublish = async () => {
    let newFormDate;
    if (formDate && formTime) {
      newFormDate = new Date(`${formDate}T${formTime}`);
    } else {
      newFormDate = null; // Changed from "" to null
    }
    const formData = {
      formTitle,
      formURL,
      formDate: newFormDate,
      form: {
        fields: formFields,
        isDirty,
        isPublished,
      },
      viewCount: 0,
      submissionCount: 0,
    };
    if (formFields.length >= 1) {
      try {
        if (id) {
          // If id exists, update the existing document
          const formDocRef = doc(db, "forms", id);
          await setDoc(formDocRef, formData, { merge: true });
          showToast(toastMessages.success.form.updated, "success");
          navigate("/admin-dashboard");
        } else {
          // If no id, create a new document
          const formsCollection = collection(db, "forms");
          const docRef = await addDoc(formsCollection, formData);
          showToast(toastMessages.success.form.added, "success");
          navigate("/admin-dashboard");
        }
      } catch (error) {
        showToast(toastMessages.error.common, "error");
      }
    } else {
      showToast(toastMessages.warning.limit, "warning");
    }
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    dispatch(setFormTitle(tempTitle));
    setIsEditingTitle(false);
  };

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

  const renderFormField = (field: FormField): JSX.Element => {
    switch (field.type) {
      case "Text Area":
        return (
          <>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </>
        );
      case "Numeric Rating":
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">{field.label}</Typography>
            <Box sx={{ display: "flex", mt: 1 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                <Button
                  key={number}
                  variant="outlined"
                  sx={{
                    minWidth: "36px",
                    height: "36px",
                    p: 0,
                    borderRadius: 0,
                    borderRight: number === 10 ? 1 : 0,
                    borderColor: "black",
                    color: "black",
                  }}
                >
                  {number}
                </Button>
              ))}
            </Box>
          </Box>
        );
      case "Star Rating":
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">{field.label}</Typography>
            <Rating
              name={`star-rating-${field.id}`}
              sx={{ fontSize: "2rem" }}
            />
          </Box>
        );
      case "Smiley Rating":
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">{field.label}</Typography>
            <Rating
              name={`smiley-rating-${field.id}`}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
            />
          </Box>
        );
      case "Single Line Input":
        return (
          <>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            <TextField fullWidth variant="outlined" margin="normal" />
          </>
        );
      case "Radio Button":
        return (
          <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              row
              aria-label="options"
              name={`radio-buttons-${field.id}`}
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
          </FormControl>
        );
      case "Categories":
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {field.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    field.selectedOption === option ? "contained" : "outlined"
                  }
                  sx={{
                    minWidth: "120px",
                    height: "40px",
                    p: 1,
                    borderRadius: 4,
                    borderColor: "black",
                    color: "black",
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>
          </Box>
        );
      default:
        return <></>;
    }
  };

  return (
    <Box sx={styles.rootComponent}>
      <Header
        isDirty={isDirty}
        isPublished={isPublished}
        formFieldsLength={formFields.length}
        onSave={handleSave}
        onPublish={handlePublish}
        // disableSave={formFields.length < 1} // Disable when less than 1 field
        // disablePublish={formFields.length < 1} // Disable when less than 1 field
      />
      <Box sx={styles.contentContainer}>
        <Box sx={styles.formContainer}>
          {isEditingTitle ? (
            <Box sx={styles.titleContainer}>
              <TextField
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                size="small"
                sx={{
                  ...styles.formTitle,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
              <IconButton onClick={handleTitleSave} sx={{ color: "white" }}>
                <SaveIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={styles.titleContainer}>
              <Typography variant="h4" sx={styles.formTitle}>
                {formTitle}
              </Typography>
              <IconButton onClick={handleTitleEdit} sx={{ color: "white" }}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={styles.formFields}>
            {formFields.map((field: any) => (
              <Box key={field.id} sx={styles.formBox}>
                {renderFormField(field)}
                <Stack flexDirection="row" justifyContent="flex-end">
                  <IconButton onClick={() => startEditing(field)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteFormField(field.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Box>
          {formFields.length === 0 && (
            <Box sx={styles.emptyFormSpace}>Add Fields</Box>
          )}
        </Box>
        <Box sx={styles.sidebar}>
          {editingField ? (
            <EditFieldSidebar
              field={editingField}
              onUpdate={updateFormField}
              onCancel={() => setEditingField(null)}
            />
          ) : (
            <Sidebar onAddField={addFormField} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateForm;
