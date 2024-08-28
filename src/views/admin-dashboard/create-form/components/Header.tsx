import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface HeaderProps {
  isDirty: boolean;
  isPublished: boolean;
  formFieldsLength: number;
  onSave: () => void;
  onPublish: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDirty,
  isPublished,
  formFieldsLength,
  onSave,
  onPublish,
}) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      sx={styles.header}
    >
      <Typography variant="h4">User Feedback</Typography>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!isDirty}
          sx={{
            backgroundColor: "#2196F3",
            "&:hover": {
              backgroundColor: "#7B1FA2",
            },
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          onClick={onPublish}
          disabled={isPublished || formFieldsLength === 0}
          sx={{
            backgroundColor: "#2E7D32",
            "&:hover": {
              backgroundColor: "#1B5E20",
            },
          }}
        >
          Publish
        </Button>
      </Box>
    </Stack>
  );
};

const styles = {
  header: {
    padding: 2,
    borderBottom: "1px solid #e0e0e0",
  },
  buttonContainer: {
    display: "flex",
    gap: 2,
  },
};

export default Header;
