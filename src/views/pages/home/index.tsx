import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import WebLayout from "layout/webLayout/WebLayout";
import DynamicForm from "views/components/DynamicForm";
import { useDynamicForm } from "hooks/useDynamicForm";

const Home = () => {
  return (
    <WebLayout>
      <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: "#ecf0f1" }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "#2c3e50", fontWeight: "bold" }}
        >
          Welcome to YourCompany
        </Typography>
        {/* Rest of your component */}
      </Paper>
      {/* Rest of your component */}
    </WebLayout>
  );
};

export default Home;
