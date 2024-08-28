import React from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Interface for the props
interface CommonModalProps {
  open: boolean;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  inputLabel?: string;
  inputValue?: string;
  isSubmitting?: boolean;
  agreeText?: string;
  disagreeText?: string;
  showDisagreeButton?: boolean;
  onClose: () => void;
  onAgreeAction: () => void;
  onDisAgreeAction?: () => void;
  onInputChange?: (value: string) => void;
}

// Common Modal Component
const ModalDialog = ({
  open,
  title,
  description,
  inputLabel = "Input",
  inputValue = "",
  isSubmitting = false,
  agreeText = "Agree",
  disagreeText = "Cancel",
  showDisagreeButton = true,
  onClose,
  onAgreeAction,
  onDisAgreeAction,
  onInputChange,
}: CommonModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        // Customize the backdrop
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Light gray color with opacity
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper", // Background color of the modal
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {onInputChange && (
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            margin="normal"
            variant="standard"
          />
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            onClick={onAgreeAction}
            variant="text"
            sx={{ color: "#189657" }}
          >
            {agreeText}
          </Button>
          {showDisagreeButton && (
            <Button
              onClick={onDisAgreeAction || onClose}
              variant="text"
              sx={{ color: "#191919" }}
            >
              {disagreeText}
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
