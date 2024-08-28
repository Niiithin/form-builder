import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import WebLayout from "layout/webLayout/WebLayout";
import DynamicForm from "views/components/DynamicForm";
import { useDynamicForm } from "hooks/useDynamicForm";

const Home = () => {
  return (
    <WebLayout>
      {/* Welcome Section */}
      <Paper
        elevation={3}
        sx={{
          p: 6,
          mb: 6,
          backgroundColor: "#ecf0f1",
          borderRadius: 3,
          backgroundImage: "linear-gradient(to right, #ecf0f1, #bdc3c7)",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "#2c3e50", fontWeight: "bold", textAlign: "center" }}
        >
          Welcome to YourCompany
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#7f8c8d", textAlign: "center", mb: 4 }}
        >
          We provide the best solutions for your business needs.
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 2,
              borderRadius: 5,
              backgroundColor: "#2980b9",
              "&:hover": { backgroundColor: "#1f618d" },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>

      {/* Services Section */}
      <Box
        sx={{
          mb: 6,
          py: 6,
          px: 4,
          backgroundColor: "#f5f5f5",
          backgroundImage: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#2c3e50",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {[
            "Web Development",
            "Mobile Apps",
            "UI/UX Design",
            "Digital Marketing",
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={4}
                sx={{ borderRadius: 3, backgroundColor: "#ffffff" }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ color: "#2c3e50", fontWeight: "bold", mb: 2 }}
                  >
                    {service}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                    We offer comprehensive {service.toLowerCase()} services to
                    cater to all your business needs.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Us Section */}
      <Paper
        elevation={3}
        sx={{
          p: 6,
          mb: 6,
          backgroundColor: "#f9f9f9",
          borderRadius: 3,
          backgroundImage: "linear-gradient(to right, #f9f9f9, #e3e3e3)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#2c3e50",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#7f8c8d", textAlign: "center", mb: 4 }}
        >
          At YourCompany, we are committed to delivering top-notch services that
          drive success and growth for our clients. Our team of experts
          leverages cutting-edge technology and industry best practices to
          ensure you stay ahead of the competition.
        </Typography>
        <Box textAlign="center">
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 5, px: 4, py: 2 }}
          >
            Learn More About Us
          </Button>
        </Box>
      </Paper>

      {/* Contact Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          py: 6,
          px: 4,
          backgroundColor: "#ecf0f1",
          backgroundImage: "linear-gradient(to right, #ecf0f1, #bdc3c7)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#2c3e50", fontWeight: "bold", mb: 4 }}
        >
          Get in Touch
        </Typography>
      </Box>
    </WebLayout>
  );
};

export default Home;
