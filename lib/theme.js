import { createMuiTheme } from "@material-ui/core";

// Crops-inspired palette: wheat, golden, amber, harvest
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#E6C547",
      main: "#C9A227",
      dark: "#9A7B00",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8B9E6B",
      main: "#6B8E23",
      dark: "#4A6616",
      contrastText: "#fff",
    },
    background: {
      default: "#FDF8F0",
      paper: "#FFFEF9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
