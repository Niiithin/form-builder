/* Imports */
import { alpha } from "@mui/material";

export default {
  rootStyle: (theme: any) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    position: "relative",
    zIndex: 1,
  }),
  logo: {
    width: 64,
    height: 64,
  },
  outerBox: (theme: any) => ({
    width: 120,
    height: 120,
    borderRadius: "25%",
    position: "absolute",
    border: `8px solid ${alpha(theme.palette.primary.dark, 0.24)}`,
  }),
  innerBox: (theme: any) => ({
    width: 100,
    height: 100,
    borderRadius: "25%",
    position: "absolute",
    border: `3px solid ${alpha(theme.palette.primary.dark, 0.24)}`,
  }),
};
