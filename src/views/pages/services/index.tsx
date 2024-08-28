import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { Laptop, Insights, Cloud, Build } from "@mui/icons-material";
import WebLayout from "layout/webLayout/WebLayout";

const Services = () => {
  const services = [
    {
      title: "Consulting",
      description:
        "Expert advice to help you make informed decisions and optimize your business processes.",
      icon: <Build fontSize="large" />,
    },
    {
      title: "Software Development",
      description:
        "Custom software solutions tailored to your specific needs and requirements.",
      icon: <Laptop fontSize="large" />,
    },
    {
      title: "Data Analytics",
      description:
        "Advanced data analysis to unlock insights and drive your business forward.",
      icon: <Insights fontSize="large" />,
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable and secure cloud infrastructure to support your growing business needs.",
      icon: <Cloud fontSize="large" />,
    },
  ];

  return (
    <WebLayout>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ color: "#2c3e50", fontWeight: "bold", mb: 4 }}
      >
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ecf0f1",
                  color: "#3498db",
                }}
              >
                {service.icon}
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ color: "#2c3e50" }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </WebLayout>
  );
};

export default Services;
