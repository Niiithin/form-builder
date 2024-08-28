/* Imports */
import { useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import "@mui/lab/themeAugmentation";

/* Relative Imports */

/* Local Imports */
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import shape from "./shape";
import typography from "./typography";
// import GlobalStyle from './globalStyles';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create theme Config which is used to set themes to its children components.
 *
 * @interface IThemeConfigProps
 * @property {node} children - nested components to set the theme.
 */
export interface IThemeConfigProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Theme Config is used to set themes to its children components
 *
 * @param children - nested components to set the theme
 * @returns provides theme to its children
 */
const ThemeConfig: React.FC<IThemeConfigProps> = ({
  children,
}): JSX.Element => {
  const isLight = "light";
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shape,
      typography,
      breakpoints,
      direction: "ltr",
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  /* Output */
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <GlobalStyle /> */}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
