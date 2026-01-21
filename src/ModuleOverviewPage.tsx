import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  LinearProgress,
} from "@mui/material";
import linux from "./assets/linux.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getModuleDetailsById,
  type SimpleModuleDetails,
} from "./Services/ModulesService";
import SubNavMenu from "./Common/Navigation/SubNavMenu";

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

export default function ModuleOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moduleInfo, setModuleInfo] = useState<SimpleModuleDetails>();

  useEffect(() => {
    fetchModuleDetails();
  }, []);

  async function fetchModuleDetails() {
    await getModuleDetailsById(id ?? "").then((module) => {
      setModuleInfo(module);
      console.log(module);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "#E6F1FF",
        }}
      >
        {/* PAGE CONTENT */}
        <Container sx={{ mt: 12, pb: 10 }}>
          {/* HEADER SECTION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box sx={{ width: "35%" }}>
              {/* Tags */}
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Typography
                  sx={{ fontSize: 12, color: "#A6FA12", fontWeight: 700 }}
                >
                  {moduleInfo?.category}
                </Typography>
                <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                  {moduleInfo?.type}
                </Typography>
              </Stack>

              {/* Title */}
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                {moduleInfo?.name}
              </Typography>
              {!moduleInfo?.isStarted && (
                <>
                  {/* Meta */}
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ opacity: 0.75, mb: 2 }}
                  >
                    <Typography>{moduleInfo?.difficulty}</Typography>
                    <Typography>{moduleInfo?.tier}</Typography>
                    <Typography>
                      Estimated {moduleInfo?.estimatedHours} Hours
                    </Typography>
                  </Stack>

                  {/* Rating row */}

                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ opacity: 0.75, mb: 3 }}
                  >
                    <Typography>★★★★★ 229 Reviews</Typography>
                    <Typography>Last Updated 10 months ago</Typography>
                  </Stack>
                </>
              )}

              {moduleInfo?.isStarted && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 3,
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: 14 }}>
                      Module progress
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        fontSize: 14,
                        color: "lime",
                      }}
                    >
                      {moduleInfo?.userPercentCompleted}% completed
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={moduleInfo?.userPercentCompleted ?? 0}
                    sx={{
                      width: "100%",
                      height: 13,
                      mr: 1.5,
                      borderRadius: 999,
                      overflow: "hidden",
                      backgroundColor: "#131a2a",
                      backgroundImage:
                        "repeating-linear-gradient(-45deg, rgba(255,255,255,0.28) 0 5px, rgba(255,255,255,0.06) 5px 10px)",
                      backgroundSize: "14px 14px",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.18)",
                        backgroundImage: "none",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Button + Favorite */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!moduleInfo?.isStarted ? (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#A6FA12",
                      color: "#0A0F1E",
                      fontWeight: 700,
                    }}
                  >
                    Start Module
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#A6FA12",
                      color: "#0A0F1E",
                      fontWeight: 700,
                    }}
                    onClick={() =>
                      navigate(
                        `/module/${id}/section/${moduleInfo.currentSectionId}`
                      )
                    }
                  >
                    Continue Module
                  </Button>
                )}

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
                {moduleInfo?.sectionsCount} sections ·{" "}
                {moduleInfo?.interactiveSectionsCount} Interactive
              </Typography>
            </Box>
          </Stack>

          {/* SECTION LIST */}
          <Stack spacing={2}>
            {moduleInfo?.sections.map((section) => (
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
                      {section.orderIndex}
                    </Box>

                    <Typography sx={{ fontWeight: 700 }}>
                      {section.name}
                    </Typography>
                  </Box>
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
              <Typography sx={{ color: "#9AF80B" }}>
                {moduleInfo?.reward} Cubes
              </Typography>
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
