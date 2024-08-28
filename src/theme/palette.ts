/* Imports */
import { alpha } from "@mui/material";

// ----------------------------------------------------------------------

/**
 * To create a linear gradient using the given color parameters
 *
 * @param color1 - color that is used to create linear gradient
 * @param color2 - color that is used to create linear gradient
 * @returns linear-gradient of both the colors
 */
function createGradient(color1: string, color2: string): string {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

/* SETUP COLORS */
const PRIMARY = {
  light: "#7CB2FE",
  main: "#5578F4",
  dark: "#164C98",
};
const SECONDARY = {
  light: "#8E8E8E",
  main: "#FE5B00",
  dark: "#983600",
};
const INFO = {
  light: "#74CAFF",
  main: "#F5D563",
  dark: "#0C53B7",
};
const SUCCESS = {
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
};
const WARNING = {
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
};
const ERROR = {
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
};

const GREY = {
  50: "#F2F2F2",
  100: "#F6F5F6",
  200: "#ECEBED",
  300: "#D4D4D4",
  400: "#ABABAB",
  500: "#777778",
  600: "#49474E",
  700: "#23272E",
  800: "#1A1B20",
  900: "#0A0A0A",
  500_8: alpha("#777778", 0.08),
  500_12: alpha("#777778", 0.12),
  500_16: alpha("#777778", 0.16),
  500_24: alpha("#777778", 0.24),
  500_32: alpha("#777778", 0.32),
  500_48: alpha("#777778", 0.48),
  500_56: alpha("#777778", 0.56),
  500_80: alpha("#777778", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: "#fff" },
  warning: { ...WARNING, contrastText: "#fff" },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    divider: GREY[300],
    text: { primary: GREY[900], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: GREY[50], default: "#fff" },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    divider: GREY[600],
    text: { primary: "#fff", secondary: GREY[300], disabled: GREY[500] },
    background: { paper: GREY[800], default: GREY[900] },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
