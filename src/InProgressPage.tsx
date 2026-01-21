import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  IconButton,
  Chip,
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
  Grid,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubNavMenu from "./Common/Navigation/SubNavMenu";

const C = {
  bg: "#0A0F1E",
  surface: "#1a2332",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  purple: "#b41cb9",
  border: "rgba(255,255,255,0.06)",
};

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: C.lime },
    background: { default: C.bg, paper: C.surface },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
theme = responsiveFontSizes(theme);

// Komponent paska postępu (segmentowany jak na screenie)
function SegmentedProgress({ value }: { value: string }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          height: 6,
          flex: 1,
          borderRadius: 1,
          backgroundColor: "#131a2a",
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, ${C.bg} 8px, ${C.bg} 11px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: value,
            bgcolor: C.lime,
            borderRadius: 1,
          }}
        />
      </Box>
      <Typography
        sx={{ fontSize: 11, fontWeight: 800, color: C.textDim, minWidth: 40 }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

interface ModuleCardProps {
  title: string;
  hasInProgressTag?: boolean;
  hasHeart?: boolean;
  progress?: string;
  details?: {
    difficulty: string;
    time: string;
    tier: string;
  };
}

function ModuleCard({
  title,
  hasInProgressTag,
  hasHeart,
  progress,
  details,
}: ModuleCardProps) {
  return (
    <Box
      sx={{
        bgcolor: C.surface,
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)", cursor: "pointer" },
      }}
    >
      {/* Sekcja Obrazka (Placeholder) */}
      <Box sx={{ position: "relative", height: 160, bgcolor: "#0d1321" }}>
        {hasInProgressTag && (
          <Chip
            label="In Progress"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: C.purple,
              color: "#fff",
              borderRadius: 1,
              fontWeight: 800,
              fontSize: 10,
              height: 20,
            }}
          />
        )}
        {hasHeart && (
          <FavoriteBorderIcon
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: C.textDim,
              fontSize: 20,
            }}
          />
        )}
        {/* Tu byłoby tło obrazka */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
          }}
        >
          {/* Ikona zastępcza zamiast obrazu */}
          <SchoolIcon sx={{ fontSize: 60, color: C.border }} />
        </Box>
      </Box>

      {/* Treść */}
      <Box sx={{ p: 2, flex: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SchoolIcon sx={{ fontSize: 14, color: C.lime }} />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                color: C.textDim,
                letterSpacing: 0.5,
              }}
            >
              REGULAR
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <MenuBookIcon sx={{ fontSize: 14, color: C.textDim }} />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                color: C.textDim,
                letterSpacing: 0.5,
              }}
            >
              GENERAL
            </Typography>
          </Stack>
        </Stack>

        <Typography
          sx={{ fontWeight: 800, fontSize: 18, color: C.text, mb: 2 }}
        >
          {title}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: C.border }} />

      {/* Stopka karty */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {progress ? (
          <SegmentedProgress value={progress} />
        ) : (
          <Stack direction="row" spacing={2} sx={{ color: C.textDim }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <BarChartIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {details?.difficulty}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {details?.time}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {details?.tier}
            </Typography>
          </Stack>
        )}
        <ArrowForwardIosIcon sx={{ fontSize: 14, color: C.textDim, ml: 1 }} />
      </Box>
    </Box>
  );
}

export default function InProgressPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
        <Container maxWidth="xl" sx={{ pt: 10 }}>
          {/* Header sekcji */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ mb: 4 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: C.text }}>
              Modules In Progress
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                sx={{
                  color: C.text,
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: "underline",
                  cursor: "pointer",
                  "&:hover": { color: C.lime },
                }}
              >
                View all Modules In Progress
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#1b2434",
                    borderRadius: 1,
                    color: C.textDim,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#1b2434",
                    borderRadius: 1,
                    color: C.textDim,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

          {/* Grid kart */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ModuleCard
                title="Linux Fundamentals"
                hasHeart
                progress="6.67%"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ModuleCard
                title="Introduction To Networking"
                hasInProgressTag
                progress="4.76%"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ModuleCard
                title="Web Requests"
                hasInProgressTag
                details={{
                  difficulty: "Fundamental",
                  time: "4h",
                  tier: "Tier 0",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ModuleCard
                title="Windows Fundamentals"
                hasInProgressTag
                details={{
                  difficulty: "Fundamental",
                  time: "6h",
                  tier: "Tier 0",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
