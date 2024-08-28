import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormField } from "models/models";

interface EditFieldSidebarProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onCancel: () => void;
}

const EditFieldSidebar: React.FC<EditFieldSidebarProps> = ({
  field,
  onUpdate,
  onCancel,
}) => {
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);
  const [errorMessage, setErrorMessage] = useState(field.errorMessage || "");
  const [options, setOptions] = useState(
    field.options && field.options.length > 0
      ? field.options
      : ["Option 1", "Option 2", "Option 3"]
  );

  const handleUpdate = () => {
    onUpdate({
      ...field,
      label,
      required,
      errorMessage: required ? errorMessage : "This field is required",
      options:
        field.type === "Radio Button" || field.type === "Categories"
          ? options
          : [],
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Box sx={styles.sidebar}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onCancel}
        sx={styles.backButton}
      >
        Back to adding fields
      </Button>
      <Typography variant="h6" sx={styles.title}>
        Edit {field.type}
      </Typography>
      <TextField
        label="Field Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
        }
        label="Required"
      />
      {required && (
        <TextField
          label="Error Message"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}

      {(field.type === "Radio Button" || field.type === "Categories") && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Options
          </Typography>
          {options.map((option, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <TextField
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                margin="normal"
              />
              <IconButton
                onClick={() => handleRemoveOption(index)}
                sx={styles.deleteIcon}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddOption} sx={styles.addOptionButton}>
            Add Option
          </Button>
        </>
      )}

      <Button
        variant="contained"
        onClick={handleUpdate}
        sx={styles.updateButton}
      >
        Update Field
      </Button>
    </Box>
  );
};

export default EditFieldSidebar;

const styles = {
  sidebar: {
    width: "300px",
    padding: "20px",
    borderLeft: "1px solid #ccc",
  },
  backButton: {
    marginBottom: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  updateButton: {
    marginTop: "20px",
  },
  addOptionButton: {
    marginTop: "10px",
    marginBottom: "20px",
  },
  deleteIcon: {
    marginLeft: "10px",
  },
};
