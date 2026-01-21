import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  Switch,
  IconButton,
  Chip,
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddBoxIcon from "@mui/icons-material/AddBox";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import SubNavMenu from "./Common/Navigation/SubNavMenu";

const C = {
  bg: "#0A0F1E",
  surface: "#0F1529",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
  borderSoft: "rgba(255,255,255,0.04)",
  cardBg: "#1a2332",
};

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

// POPRAWIONY StatBox - teraz używa label
function StatBox({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          color: C.textDim,
          fontWeight: 700,
          fontSize: 12,
          mb: 0.5,
          textTransform: "none",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          bgcolor: "#111927",
          p: 1.2,
          borderRadius: 1,
          border: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ color: C.lime, display: "flex", alignItems: "center" }}>
            {React.cloneElement(icon, { sx: { fontSize: 20 } })}
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
            {value}
          </Typography>
        </Stack>
        <IconButton size="small" sx={{ color: C.textDim, p: 0.5 }}>
          <AddBoxIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function AccountSettingsPage() {
  const username = localStorage.getItem("username") || "r3d0s3c";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
        <Container maxWidth="lg" sx={{ pt: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, letterSpacing: -0.5 }}>
            Account settings
          </Typography>

          {/* GÓRNA SEKCJA */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            sx={{ mb: 3 }}
            alignItems="stretch"
          >
            {/* Profil */}
            <Box
              sx={{
                flex: 2,
                bgcolor: "background.paper",
                p: 3,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                  {username}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ color: C.textDim }}
                >
                  <BoltIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Free
                  </Typography>
                </Stack>
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: C.lime,
                    color: "#000",
                    px: 3,
                    "&:hover": { bgcolor: "#95e010" },
                  }}
                >
                  Upgrade
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: C.text,
                    px: 3,
                  }}
                >
                  Manage Plan
                </Button>
              </Stack>
            </Box>

            {/* Statystyki (Cubes & Vouchers) */}
            <Box sx={{ flex: 0.8 }}>
              <StatBox icon={<ViewInArIcon />} label="Cubes" value="20" />
              <StatBox
                icon={<LocalActivityIcon />}
                label="Exam Vouchers"
                value="0"
              />
            </Box>

            {/* Student ID */}
            <Box
              sx={{
                flex: 1,
                bgcolor: "background.paper",
                p: 3,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
              }}
            >
              <Typography sx={{ fontWeight: 800, mb: 1, fontSize: 14 }}>
                Student ID
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: C.textDim, lineHeight: 1.4, mb: 3, fontSize: 13 }}
              >
                Your unique Student ID lets others view your progress in HTB
                Academy.
                <Typography
                  component="span"
                  sx={{
                    color: C.lime,
                    ml: 0.5,
                    cursor: "pointer",
                    fontSize: 13,
                    textDecoration: "underline",
                  }}
                >
                  Learn more here
                </Typography>
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: C.text,
                  py: 1,
                }}
              >
                Generate Student ID
              </Button>
            </Box>
          </Stack>

          {/* LISTA USTAWIEŃ */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            {/* Show Solutions */}
            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2.5,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={2.5} alignItems="center">
                <VisibilityOutlinedIcon
                  sx={{ color: C.textDim, fontSize: 28 }}
                />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                      Show Solutions
                    </Typography>
                    <Chip
                      label="PRO"
                      size="small"
                      sx={{
                        bgcolor: "#b41cb9",
                        color: "#fff",
                        height: 18,
                        fontSize: 10,
                        fontWeight: 900,
                        borderRadius: 0.5,
                      }}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: C.textDim }}>
                    Enable step-by-step solutions for all questions
                  </Typography>
                </Box>
              </Stack>
              <Switch
                disabled
                sx={{ "& .MuiSwitch-track": { bgcolor: "#333" } }}
              />
            </Box>

            {/* Student Transcript */}
            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2.5,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={2.5} alignItems="center">
                <DescriptionOutlinedIcon
                  sx={{ color: C.textDim, fontSize: 28 }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                    Student Transcript
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: C.textDim, maxWidth: 600 }}
                  >
                    Your transcript provides a comprehensive record of your
                    progress in HTB Academy, including completed modules, paths,
                    and obtained certifications.
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: C.text,
                  px: 4,
                  py: 1,
                  whiteSpace: "nowrap",
                }}
              >
                Download Transcript
              </Button>
            </Box>
          </Stack>

          {/* DOLNE SEKCJE LINKÓW */}
          <Typography sx={{ fontWeight: 800, mb: 2, fontSize: 18 }}>
            Personal Information
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 2,
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
              cursor: "pointer",
              "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <ViewInArIcon sx={{ color: C.lime, fontSize: 20 }} />
              <Typography sx={{ fontWeight: 700, color: C.textDim }}>
                HTB Account
              </Typography>
            </Stack>
            <LaunchIcon sx={{ color: C.textDim, fontSize: 18 }} />
          </Box>

          <Typography sx={{ fontWeight: 800, mb: 2, fontSize: 18 }}>
            Payment and Subscriptions
          </Typography>
          <Stack spacing={1}>
            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <BoltIcon sx={{ color: C.textDim, fontSize: 20 }} />
                <Typography sx={{ fontWeight: 700, color: C.textDim }}>
                  Available plans and plan management
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <DescriptionOutlinedIcon
                  sx={{ color: C.textDim, fontSize: 20 }}
                />
                <Typography sx={{ fontWeight: 700, color: C.textDim }}>
                  Change payment method
                </Typography>
              </Stack>
              <LaunchIcon sx={{ color: C.textDim, fontSize: 18 }} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
