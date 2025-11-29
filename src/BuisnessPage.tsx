import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";

let theme = createTheme({
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

theme = responsiveFontSizes(theme);

export default function BusinessPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "#0A0F1E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(154,248,11,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,209,255,0.07), transparent 40%)",
        }}
      >
        <Container maxWidth="md">
          {/* Nagłówek */}
          <Typography
            variant="overline"
            sx={{
              fontSize: 16,
              letterSpacing: 2,
              color: "#A6FA12",
              fontWeight: 700,
            }}
          >
            ACADEMY FOR BUSINESS
          </Typography>

          {/* GŁÓWNY NAPIS */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mt: 2,
              mb: 3,
              fontSize: "clamp(32px, 5vw, 68px)",
            }}
          >
            Build cybersecurity
            <br />
            talent from within.
          </Typography>

          {/* ZASTĘPUJEMY TREŚĆ → COMING SOON */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#A6FA12",
              mt: 6,
              mb: 2,
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            🚧 Coming Soon 🚧
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", mb: 5 }}
          >
            We're working hard to bring Business Cybersecurity Training to life.
            Stay tuned for something amazing.
          </Typography>

          {/* Przycisk */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: 18,
              color: "#0A0F1E",
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Notify Me
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
