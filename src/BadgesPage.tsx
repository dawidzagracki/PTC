import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Tabs,
  Tab,
  Switch,
  // Zmiana na Grid2, jeśli używasz najnowszej wersji,
  // lub pozostawienie Grid, ale z nową składnią
  Grid,
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/Lock";
import DiamondIcon from "@mui/icons-material/Diamond";
import SubNavMenu from "./Common/Navigation/SubNavMenu";

const C = {
  bg: "#0A0F1E",
  surface: "#111927",
  cardBg: "#151c2c",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
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

// ROZWIĄZANIE BŁĘDU 1: Usunięto 'isCompleted' z destrukturyzacji, skoro nie jest używane
function BadgeCard({
  title,
  description,
  isLocked = true,
}: {
  title: string;
  description: string;
  isLocked?: boolean;
}) {
  return (
    <Box
      sx={{
        bgcolor: C.cardBg,
        borderRadius: 3,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        border: `1px solid ${C.border}`,
        transition: "transform 0.2s",
        height: "100%",
        "&:hover": { transform: "translateY(-4px)" },
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `2px dashed ${isLocked ? C.border : C.lime}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {isLocked ? (
          <LockIcon sx={{ fontSize: 30, color: C.textDim }} />
        ) : (
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: C.lime,
              borderRadius: "50%",
              opacity: 0.2,
            }}
          />
        )}
      </Box>

      <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 13, color: C.textDim, lineHeight: 1.4 }}>
        {description}
      </Typography>
    </Box>
  );
}

export default function BadgesPage() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
        <Container maxWidth="xl" sx={{ pt: 6 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 4 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900 }}>
              Badges
            </Typography>

            <Box
              sx={{
                bgcolor: "rgba(21, 28, 44, 0.8)",
                p: 2,
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <DiamondIcon sx={{ color: C.lime, fontSize: 40 }} />
              <Box>
                <Typography
                  sx={{
                    color: C.textDim,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Total Achievements
                </Typography>
                <Stack direction="row" alignItems="baseline" spacing={0.5}>
                  <Typography sx={{ fontSize: 24, fontWeight: 900 }}>
                    6
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 700, color: C.textDim }}
                  >
                    / 196
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>

          <Box
            sx={{
              borderBottom: 1,
              borderColor: C.border,
              mb: 6,
              position: "relative",
            }}
          >
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
              <Tab label="Module Completion" />
              <Tab label="Path Completion" />
              <Tab label="Mission" />
              <Tab label="Exam Completion" />
              <Tab label="Custom" />
            </Tabs>
            <SearchIcon
              sx={{ position: "absolute", right: 0, top: 12, color: C.textDim }}
            />
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography sx={{ fontWeight: 900, fontSize: 24 }}>
                Module Completion Badges
              </Typography>
              <Typography
                sx={{ fontWeight: 800, fontSize: 20, color: C.textDim }}
              >
                4 / 154
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch size="small" />
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: C.textDim }}
              >
                Show completed only
              </Typography>
            </Stack>
          </Stack>

          {/* ROZWIĄZANIE BŁĘDU 2: Usunięto 'item' oraz zmieniono składnię na Grid v2 (size) */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <BadgeCard
                title="Philomath"
                description="Learning Process module completed"
                isLocked={false}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <BadgeCard
                title="Academician"
                description="Introduction to Academy module completed"
                isLocked={false}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <BadgeCard
                title="Hacking in the wild"
                description="Hacking WordPress module completed"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <BadgeCard
                title="Our favorite seabird"
                description="Linux Fundamentals module completed"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <BadgeCard
                title="The eye that sees all"
                description="Network Enumeration with Nmap module completed"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
