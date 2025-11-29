import {
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";
import { useEffect, useState } from "react";
import { getAllPaths, type PathListItemDto } from "./Services/PathsService";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LayersIcon from "@mui/icons-material/Layers";

const C = {
  bg: "#0A0F1E",
  surface: "#0F1529",
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

export default function PathsPage() {
  const [paths, setPaths] = useState<PathListItemDto[]>([]);
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    fetchPaths();
  }, []);

  async function fetchPaths() {
    await getAllPaths().then((paths) => {
      setPaths(paths);
      console.log(paths);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          pt: 5,
          pb: 0,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 900, mb: 2, fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Cybersecurity Paths
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            maxWidth: "80%",
            mx: "auto",
            color: C.textDim,
            mb: 10,
            lineHeight: 1.6,
          }}
        >
          To provide guidance on which modules to study in order to obtain a
          specific skill or even the practical skills and mentality necessary
          for a specific job role, HTB Academy features two kinds of paths,
          "Skill Paths" and "Job Role Paths". Modules in paths are presented in
          a logical order to make your way through studying.
        </Typography>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 1002,
              bgcolor: "background.paper",
              borderRadius: 2,
              px: 0,
              py: 2,
              top: 300,
              display: "flex",
              justifyContent: "center",
              width: 680,
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                textTransform: "none",
                fontWeight: 800,
                width: "25%",
                fontSize: 14,
                px: 5,
                borderRadius: 1.5,
                bgcolor: C.lime,
                color: "#101927",
                "&:hover": { bgcolor: "#b7ff2a" },
              }}
            >
              All
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                width: "25%",
                fontSize: 14,
                px: 5,
                borderRadius: 1.5,
                color: C.textDim,
              }}
            >
              Job Role Paths
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                width: "25%",
                px: 5,
                borderRadius: 1.5,
                color: C.textDim,
              }}
            >
              Skill Paths
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: C.text,
          mt: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 8, pb: 10 }}>
          <Typography
            align="center"
            sx={{ color: C.textDim, mb: 5, fontSize: 14 }}
          >
            Both Job Role and Skill Paths are presented here.
          </Typography>
          {/* MAIN CARD */}
          {paths.map((item, index) => (
            <Box
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: 2,
              }}
              key={index}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  overflow: "hidden",
                }}
              >
                {/* LEFT – miejsce na grafikę (zastąpione boxem) */}
                <Box
                  sx={{
                    width: { xs: "100%", md: 380 },
                    minHeight: 260,
                    bgcolor: "background.paper",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* prostokąt udający obrazek */}
                  <Box
                    sx={{
                      width: "80%",
                      height: "70%",
                      borderRadius: 2,
                      bgcolor: "#0A0F1E",
                      border: `1px solid ${C.border}`,
                    }}
                  />
                </Box>

                {/* RIGHT – tekst ścieżki */}

                <Box sx={{ flex: 1, p: 4 }} key={index}>
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: 3,
                      color: C.textDim,
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      mt: 1,
                      mb: 2,
                      fontSize: "clamp(22px, 2.3vw, 30px)",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: C.textDim, lineHeight: 1.6, mb: 3 }}
                  >
                    {item.description}
                  </Typography>

                  {/* BOTTOM INFO ROW */}
                  <Divider sx={{ borderColor: C.border, mb: 2 }} />

                  <Box
                    sx={{
                      alignItems: { xs: "flex-start", md: "center" },
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 2,
                    }}
                  >
                    {/* Difficulty badge */}
                    <Chip
                      label={item.difficulty}
                      sx={{
                        bgcolor: "#78f84544",
                        color: "#54f734ff",
                        fontWeight: 700,
                        borderRadius: 1,
                        height: 26,
                      }}
                    />

                    <Stack
                      direction="row"
                      spacing={4}
                      sx={{ color: C.textDim, alignItems: "center" }}
                      width="100%"
                    >
                      <Stack spacing={0.3}>
                        <Typography variant="caption">Sections</Typography>
                        <Typography variant="body2" sx={{ color: C.text }}>
                          {item.totalSectionsCount} Sections
                        </Typography>
                      </Stack>
                      <Stack spacing={0.3}>
                        <Typography variant="caption">Required</Typography>
                        <Typography variant="body2" sx={{ color: C.text }}>
                          {item.totalPrice}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.3}>
                        <Typography variant="caption">Reward</Typography>
                        <Typography variant="body2" sx={{ color: C.text }}>
                          +330
                        </Typography>
                      </Stack>
                      <Box sx={{ flexGrow: 1 }} />
                      <Stack direction="row" alignItems="center">
                        <LayersIcon />
                        <Button
                          onClick={() => setShowModules(!showModules)}
                          endIcon={
                            showModules ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )
                          }
                        >
                          <Typography variant="body2" sx={{ color: C.text }}>
                            {item.modulesCount} Modules included
                          </Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Box>

              {showModules && item.modules && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  {item.modules.map((mod, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: "95%",
                        mx: "auto",
                        borderRadius: 2,
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        p: 3,
                        mb: 2,
                        bgcolor: "background.paper",
                      }}
                    >
                      {/* TYTUŁ MODUŁU */}
                      <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                        {mod.moduleName}
                      </Typography>

                      {/* GÓRNY RZĄD PARAMETRÓW */}
                      <Box
                        sx={{ display: "flex", flexDirection: "row", gap: 4 }}
                      >
                        <Typography sx={{ color: C.textDim }}>
                          {mod.difficulty}
                        </Typography>
                        <Typography sx={{ color: C.textDim }}>
                          {mod.sectionsCount} Sections
                        </Typography>
                        <Typography sx={{ color: C.textDim }}>
                          Reward: +{mod.rewardAmount}
                        </Typography>
                      </Box>

                      {/* OPIS */}
                      <Typography sx={{ color: C.textDim }}>
                        {mod.moduleDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
