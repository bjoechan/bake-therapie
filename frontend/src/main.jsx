import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";
import "./styles.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f4c86a",
      contrastText: "#211713",
    },
    secondary: {
      main: "#241b17",
      contrastText: "#fff9f1",
    },
    background: {
      default: "#fff9f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#241b17",
      secondary: "#5b4d44",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Sora, "Avenir Next", "Segoe UI", sans-serif',
    h1: {
      fontFamily: "Fraunces, Georgia, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Fraunces, Georgia, serif",
      fontWeight: 700,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
