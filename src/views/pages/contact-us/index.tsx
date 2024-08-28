import React from "react";
import { Typography, Box, TextField, Button, Grid, Paper } from "@mui/material";
import {
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import WebLayout from "layout/webLayout/WebLayout";

const ContactUs = () => {
  return (
    <WebLayout>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ color: "#2c3e50", fontWeight: "bold", mb: 4 }}
      >
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#2c3e50", mb: 3 }}
            >
              Get in Touch
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      backgroundColor: "#3498db",
                      "&:hover": { backgroundColor: "#2980b9" },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 4, height: "100%", backgroundColor: "#ecf0f1" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#2c3e50", mb: 3 }}
            >
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: "#3498db" }} />
              <Typography variant="body1">+1 (123) 456-7890</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: "#3498db" }} />
              <Typography variant="body1">info@yourcompany.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationIcon sx={{ mr: 2, color: "#3498db" }} />
              <Typography variant="body1">
                123 Business St, City, State 12345
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </WebLayout>
  );
};

export default ContactUs;
