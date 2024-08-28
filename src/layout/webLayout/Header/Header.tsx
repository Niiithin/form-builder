import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        YourCompany
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemText>
              <Button
                component={RouterLink}
                to={item.path}
                sx={{ color: "#2c3e50", width: "100%" }}
              >
                {item.name}
              </Button>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#ecf0f1", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Fade in={true} timeout={1000}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                color: "#2c3e50",
                textDecoration: "none",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box component="span" sx={{ mr: 1, fontSize: "2rem" }}>
                🚀
              </Box>
              YourCompany
            </Typography>
          </Fade>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: "#2c3e50",
                  mx: 1,
                  "&:hover": {
                    bgcolor: "rgba(44, 62, 80, 0.1)",
                  },
                  transition: "background-color 0.3s",
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "#2c3e50" }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
