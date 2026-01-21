import {
  Box,
  Button,
  Chip,
  createTheme,
  CssBaseline,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LayersIcon from "@mui/icons-material/Layers";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import valueImg from "./assets/cyberchip.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { PathModuleListItemDto } from "./Services/PathsService";

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

export default function BasePathOverviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showModules, setShowModules] = useState(false);

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
          pb: 5,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 900, mb: 2, fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          {state?.name}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <Box
          sx={{
            maxWidth: 900,
            bgcolor: "background.default",
            color: C.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 3,
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              width: "100%",
              mb: 3,
            }}
          >
            <Button
              startIcon={<ArrowBackIosIcon />}
              sx={{
                color: "grey",
                border: `1px solid ${C.border}`,
                width: 120,
                "&:hover": {
                  backgroundColor: "#5555553f", // szary po najechaniu
                  color: "white",
                  borderColor: C.border,
                },
              }}
              onClick={() => navigate("/paths")}
            >
              Go back
            </Button>
          </Box>
          <Box
            sx={{
              width: "90%",
              height: 60,
              borderRadius: 2,
              bgcolor: "#000000ff",
              border: `1px solid ${C.border}`,
              mb: 4,
            }}
          />
          <Typography
            sx={{ fontSize: 18, textAlign: "justify", width: "100%", mb: 5 }}
          >
            {state?.description}
          </Typography>
          <Divider sx={{ width: "100%", mb: 3 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexDirection: "row",
              justifyContent: "left",
              width: "100%",
              position: "relative",
            }}
          >
            <Chip
              label={state?.difficulty}
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
                {" "}
                {state?.totalSectionsCount} Sections
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
                Required: {state?.totalPrice}
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
                Reward: +{state?.totalReward}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexDirection: "row",
                position: "absolute",
                down: 0,
                zIndex: 10,
                right: 0,
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
                  {state?.modulesCount} Modules included
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {showModules && (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 2, mb: 10 }}>
          {state?.modules.map((m: PathModuleListItemDto, i: number) => (
            <Box
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
              key={i}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                {m.moduleName}
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
                  label={m.difficulty}
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
                    {m.sectionsCount} Sections
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
                    Reward: +{m.rewardAmount}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: C.textDim, fontWeight: 500 }}>
                {m.moduleDescription}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </ThemeProvider>
  );
}
