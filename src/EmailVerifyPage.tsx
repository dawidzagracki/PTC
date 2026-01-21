import * as React from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9AF80B" },
    secondary: { main: "#00D1FF" },
    background: { default: "#101927", paper: "#1a2332" },
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
    h1: {
      fontWeight: 900,
      letterSpacing: 0.2,
      fontSize: "clamp(32px, 6.5vw, 72px)",
      lineHeight: 1.05,
    },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { background: "transparent", boxShadow: "none" },
      },
    },
    MuiButton: { styleOverrides: { containedPrimary: { color: "#0A0F1E" } } },
    MuiContainer: {
      styleOverrides: { root: { paddingLeft: 16, paddingRight: 16 } },
    },
  },
});

export default function EmailVerifyPage(): React.JSX.Element {
  const email = "asdasd@wp.pl"; // możesz podmienić na dynamiczny

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Tło pełnoekranowe */}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        {/* Kontener na kartę (tak jak na środku ekranu) */}
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* „Karta” z komunikatem */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 520,
              bgcolor: "background.paper",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              px: 5,
              py: 4,
              textAlign: "left",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Pending email verification
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              An email has been sent to{" "}
              <Typography
                component="span"
                sx={{ color: "#ffffff", fontWeight: 500 }}
              >
                {email}
              </Typography>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Haven&apos;t received the email?{" "}
              <Typography
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Resend email verification →
              </Typography>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
