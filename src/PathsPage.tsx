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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import valueImg from "./assets/cyberchip.png";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [type, setType] = useState<string>("2");
  const [paths, setPaths] = useState<PathListItemDto[]>([]);
  const [basicPaths, setBasicPaths] = useState<PathListItemDto[]>([]);
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    fetchPaths();
  }, []);

  async function fetchPaths() {
    await getAllPaths().then((paths) => {
      setPaths(paths);
      setBasicPaths(paths);
      console.log(paths);
    });
  }

  function fliterPaths(filterType: string) {
    setType(filterType);
    const boolPathType =
      filterType == "0" ? false : filterType == "1" ? true : "2";
    if (boolPathType !== "2") {
      setPaths(basicPaths.filter((path) => path.type === boolPathType));
    } else {
      setPaths(basicPaths);
    }
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
                bgcolor: type === "2" ? C.lime : "transparent",
                color: type === "2" ? "#101927" : C.textDim,
                "&:hover": { bgcolor: "#b8ff2a2c", color: "#101927" },
              }}
              onClick={() => {
                fliterPaths("2");
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
                bgcolor: type === "0" ? C.lime : "transparent",
                color: type === "0" ? "#101927" : C.textDim,
                "&:hover": { bgcolor: "#b8ff2a2c", color: "#101927" },
              }}
              onClick={() => {
                fliterPaths("0");
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
                bgcolor: type === "1" ? C.lime : "transparent",
                color: type === "1" ? "#101927" : C.textDim,
                "&:hover": { bgcolor: "#b8ff2a2c", color: "#101927" },
              }}
              onClick={() => {
                fliterPaths("1");
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
          {paths.map((item, index: number) => (
            <Box
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: 2,
                position: "relative",
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

                <Box sx={{ flex: 1, p: 4, pl: 0 }} key={index}>
                  <Typography
                    variant="h5"
                    onClick={() =>
                      navigate(`/path-overview/${item.slug}`, {
                        state: {
                          description: item.description,
                          difficulty: item.difficulty,
                          totalPrice: item.totalPrice,
                          totalReward: item.totalReward,
                          totalSectionsCount: item.totalSectionsCount,
                          name: item.name,
                          modulesCount: item.modulesCount,
                          modules: item.modules,
                        },
                      })
                    }
                    sx={{
                      fontWeight: 900,
                      mt: 1,
                      mb: 2,
                      cursor: "pointer",
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
                      <Stack spacing={0.5} direction="row" alignItems="center">
                        <FormatListBulletedIcon />
                        <Typography variant="body2" sx={{ color: C.text }}>
                          {item.totalSectionsCount} Sections
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <img src={valueImg} width={40} />
                        <Typography variant="body2" sx={{ color: C.text }}>
                          Required: {item.totalPrice}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <img src={valueImg} width={40} />
                        <Typography variant="body2" sx={{ color: C.text }}>
                          Reward: {item.totalReward}
                        </Typography>
                      </Stack>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flexDirection: "row",
                          position: "absolute",
                          down: 15,
                          right: 30,
                        }}
                      >
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
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="body2" sx={{ color: C.text }}>
                            {item.modulesCount} Modules included
                          </Typography>
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>

              {showModules && item.modules && (
                <Box sx={{ width: "100%" }}>
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
                        mb: 3,
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                        {mod.moduleName}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          label={mod.difficulty}
                          sx={{
                            bgcolor: "#78f84544",
                            color: "#54f734ff",
                            fontWeight: 700,
                            borderRadius: 1,
                            height: 26,
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            flexDirection: "row",
                          }}
                        >
                          <FormatListBulletedIcon />
                          <Typography sx={{ color: C.textDim }}>
                            {mod.sectionsCount} Sections
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            flexDirection: "row",
                          }}
                        >
                          <img src={valueImg} width={35} />
                          <Typography sx={{ color: C.textDim }}>
                            Reward: +{mod.rewardAmount}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ color: C.textDim, fontWeight: 500 }}>
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
