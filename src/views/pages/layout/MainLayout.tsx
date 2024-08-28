import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Logo
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/about">
            About Us
          </Button>
          <Button color="inherit" component={RouterLink} to="/services">
            Services
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 Your Company Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
