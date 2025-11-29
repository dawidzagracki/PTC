import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Toolbar,
  AppBar,
} from "@mui/material";
import logo from "./assets/logo.png";
import linux from "./assets/linux.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const navItems = ["Dashboard", "Library", "Resources"];

theme = responsiveFontSizes(theme);

export default function ModuleOverviewPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
            minHeight: 72,
          }}
        >
          <Box sx={{ width: 2, mr: 0 }} />
          <Box sx={{ mr: 4 }}>
            <img src={logo} width={90} />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((label) => (
              <Button
                key={label}
                color="inherit"
                variant="text"
                size="small"
                sx={{ opacity: 0.9 }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1.5}>
            <Button variant="contained" color="primary">
              Upgrade
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "#E6F1FF",
        }}
      >
        {/* PAGE CONTENT */}
        <Container maxWidth="xl" sx={{ mt: 6, pb: 10 }}>
          {/* HEADER SECTION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              {/* Tags */}
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Typography
                  sx={{ fontSize: 12, color: "#A6FA12", fontWeight: 700 }}
                >
                  REGULAR
                </Typography>
                <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                  GENERAL
                </Typography>
              </Stack>

              {/* Title */}
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                Linux Fundamentals
              </Typography>

              {/* Meta */}
              <Stack direction="row" spacing={3} sx={{ opacity: 0.75, mb: 2 }}>
                <Typography>Fundamental</Typography>
                <Typography>Tier 0</Typography>
                <Typography>Estimated 6 hours</Typography>
              </Stack>

              {/* Rating row */}
              <Stack direction="row" spacing={3} sx={{ opacity: 0.75, mb: 3 }}>
                <Typography>★★★★★ 229 Reviews</Typography>
                <Typography>Last Updated 10 months ago</Typography>
              </Stack>

              {/* Button + Favorite */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#A6FA12", color: "#0A0F1E", fontWeight: 700 }}
                >
                  Start Module
                </Button>
                <Box sx={{ ml: 3, mt: 1, cursor: "pointer" }}>
                  <FavoriteBorderIcon />
                </Box>
              </Box>
            </Box>

            {/* Placeholder for large right image (removed) */}
            <Box
              sx={{
                width: 300,
                height: 260,
                borderRadius: 2,
                bgcolor: "#0F1529",
                mr: "30%",
              }}
            >
              <img src={linux} />
            </Box>
          </Box>

          {/* TAB SWITCHER */}
          <Stack direction="row" spacing={4} sx={{ mt: 6, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, color: "#A6FA12" }}>
              Progress
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Module Details</Typography>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 4 }} />

          {/* SECTIONS HEADER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Sections
              </Typography>
              <Typography sx={{ opacity: 0.7 }}>
                30 sections · 21 Interactive
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer",
                mt: 4,
              }}
            >
              Expand all sections
            </Typography>
          </Stack>

          {/* SECTION LIST */}
          <Stack spacing={2}>
            {[
              { id: 1, title: "Introduction", count: 3 },
              { id: 2, title: "The Shell", count: 3 },
              { id: 3, title: "Linux Essentials", count: 4 },
              { id: 4, title: "Users & Permissions", count: 3 },
            ].map((section) => (
              <Box
                key={section.id}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: "#4a4c4eb6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "#ffffffff",
                      }}
                    >
                      {section.id}
                    </Box>

                    <Typography sx={{ fontWeight: 700 }}>
                      {section.title}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography sx={{ opacity: 0.7 }}>
                      {section.count} Sections
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ opacity: 0.7 }} />
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography>Earn</Typography>
              <Typography sx={{ color: "#9AF80B" }}>10 Cubes</Typography>
              <Typography>back, when you complete this module</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ bgcolor: "#A6FA12", color: "#0A0F1E", fontWeight: 700 }}
            >
              Start Module
            </Button>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 2 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
