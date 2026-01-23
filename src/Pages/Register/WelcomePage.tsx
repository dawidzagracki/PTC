import { Box, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#101927", paper: "#1a2332" },
    primary: { main: "#A6FA12" },
    text: { primary: "#E6F1FF", secondary: "#99A3B3" },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default function WelcomePage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const userName = localStorage.getItem("username") ?? "";

  useEffect(() => {
    const showTimer = window.setTimeout(() => setFadeIn(true), 80);
    const fadeTimer = window.setTimeout(() => setFadeOut(true), 2250);
    const navTimer = window.setTimeout(() => navigate("/on-boarding"), 3250);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          backgroundImage:
            "radial-gradient(600px 320px at 50% 20%, rgba(166,250,18,0.12), transparent 65%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
            opacity: fadeOut ? 0 : fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.3em",
              textShadow: "0 0 18px rgba(166,250,18,0.45)",
            }}
          >
            PATH THE CODE
          </Typography>

          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 400,
              color: "text.secondary",
              letterSpacing: 0.4,
            }}
          >
            Welcome,
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "42px", sm: "54px" },
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {userName || " "}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
