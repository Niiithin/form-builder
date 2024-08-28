import React from "react";
import { Typography, Box, Paper, Grid, Avatar } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import WebLayout from "layout/webLayout/WebLayout";

const AboutUs = () => {
  const teamMembers = [
    { name: "John Doe", role: "CEO" },
    { name: "Jane Smith", role: "CTO" },
    { name: "Mike Johnson", role: "Lead Designer" },
  ];

  return (
    <WebLayout>
      <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: "#ecf0f1" }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "#2c3e50", fontWeight: "bold" }}
        >
          About Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#34495e" }}>
          Founded in 2010, YourCompany has been at the forefront of innovation
          in our industry. We are driven by a passion for excellence and a
          commitment to delivering outstanding results for our clients.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#34495e" }}>
          Our team of experts brings together years of experience and a diverse
          set of skills to tackle the most challenging problems in our field. We
          believe in continuous learning and improvement, always striving to
          stay ahead of the curve.
        </Typography>
      </Paper>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#2c3e50", fontWeight: "bold", mb: 3 }}
      >
        Our Core Values
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {["Innovation", "Integrity", "Collaboration", "Customer-focus"].map(
          (value) => (
            <Grid item xs={12} sm={6} md={3} key={value}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" sx={{ color: "#2c3e50", mb: 2 }}>
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#2c3e50", fontWeight: "bold", mb: 3 }}
      >
        Our Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={4} key={member.name}>
            <Paper
              elevation={2}
              sx={{ p: 3, textAlign: "center", backgroundColor: "#f9f9f9" }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  mb: 2,
                  backgroundColor: "#3498db",
                }}
              >
                <PersonIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                {member.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </WebLayout>
  );
};

export default AboutUs;
