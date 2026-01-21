import {
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MainNavMenu from "../../Common/Navigation/MainNavMenu";
import InfoBar from "../../Common/InfoBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getModuleDetailsByIdNoAuth,
  type ModuleDetailsNoAuth,
} from "../../Services/ModulesService";

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
    primary: { main: C.lime },
    secondary: { main: "#00D1FF" },
    background: { default: "#101927", paper: "#1a2332" },
    text: { primary: C.text, secondary: C.textDim },
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
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { background: "transparent", boxShadow: "none" },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { paddingLeft: 16, paddingRight: 16 },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default function BaseModuleOverviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [isSummary, setIsSummary] = useState(true);
  const [module, setModule] = useState<ModuleDetailsNoAuth>();

  useEffect(() => {
    fetchModuleById();
  }, []);

  async function fetchModuleById() {
    await getModuleDetailsByIdNoAuth(id ?? "").then((module) => {
      setModule(module);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          minHeight: "0vh",
          bgcolor: "background.paper",
          color: C.text,
          pb: 0,
        }}
      >
        <Box sx={{ pt: 6, pb: 0, maxWidth: "lg", px: 2, mx: "auto" }}>
          {/* BACK LINK */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 4,
              cursor: "pointer",
            }}
            onClick={() => navigate("/modules")}
          >
            <ArrowBackIosNewIcon sx={{ height: 18 }} />
            <Typography variant="body2" sx={{ color: C.textDim }}>
              {"Back to Modules"}
            </Typography>
          </Box>

          {/* TOP ROW: tytuł + grafika */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 6,
              mb: 6,
            }}
          >
            {/* LEWA STRONA – tytuł i opis */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: "clamp(28px, 3vw, 40px)",
                }}
              >
                {state?.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: C.textDim, lineHeight: 1.7, mb: 3 }}
              >
                {state?.description}
              </Typography>

              {/* TAGI – fundamental / general */}
              <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                <Chip
                  label={state?.difficulty[0]}
                  size="small"
                  sx={{
                    bgcolor: "#78f84544",
                    color: "#54f734ff",
                    fontWeight: 700,
                    borderRadius: 1,
                  }}
                />
                <Chip
                  label={state?.tag[0]}
                  size="small"
                  sx={{
                    bgcolor: "#2a9cff44",
                    color: "#69c1ff",
                    fontWeight: 700,
                    borderRadius: 1,
                  }}
                />
              </Stack>
              {/* META: rating / author */}
              <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                <Stack spacing={0.5} direction="row">
                  <Typography variant="caption" sx={{ color: C.textDim }}>
                    Rating
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: C.text }}
                  >
                    4.66
                  </Typography>
                </Stack>

                <Stack spacing={0.5} direction="row">
                  <Typography variant="caption" sx={{ color: C.textDim }}>
                    Created by
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: C.text }}
                  >
                    Cry0l1t3
                  </Typography>
                </Stack>
              </Stack>

              {/* BUTTONS */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: 1.5,
                    color: "#101927",
                    fontWeight: 800,
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Start Module
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: 1.5,
                    borderColor: C.border,
                    color: C.text,
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: C.lime,
                    },
                  }}
                  onClick={() => {
                    navigate("/business");
                  }}
                >
                  Business Version
                </Button>
              </Stack>
            </Box>

            {/* PRAWA STRONA – „grafika” modułu */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: 420 },
                  height: 260,
                  bgcolor: C.surface,
                  borderRadius: 2,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Box>
            </Box>
          </Box>

          {/* NAV TABS: Summary / Module Overview */}
          <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
            <Button
              disableRipple
              sx={{
                px: 0,
                pb: 1.5,
                borderRadius: 0,
                color: C.text,
                fontWeight: 800,
                fontSize: 16,
                borderBottom: `3px solid ${isSummary ? C.lime : "transparent"}`,
              }}
              onClick={() => setIsSummary(true)}
            >
              Summary
            </Button>
            <Button
              disableRipple
              sx={{
                px: 0,
                pb: 1.5,
                borderRadius: 0,
                color: C.textDim,
                fontWeight: 700,
                fontSize: 16,
                borderBottom: `3px solid ${
                  !isSummary ? C.lime : "transparent"
                }`,
              }}
              onClick={() => setIsSummary(false)}
            >
              Module Overview
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ pt: 2, pb: 8, maxWidth: "lg", px: 2, mx: "auto" }}>
        {/* DÓŁ: lewa kolumna – Summary, prawa – Sections */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 8,
          }}
        >
          {/* SUMMARY */}
          {isSummary ? (
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: "clamp(22px, 2.3vw, 26px)",
                }}
              >
                Summary
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: C.textDim, lineHeight: 1.7 }}
              >
                {module?.summary}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: "clamp(22px, 2.3vw, 26px)",
                }}
              >
                Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: C.textDim, lineHeight: 1.7 }}
              >
                {module?.overview}
              </Typography>
            </Box>
          )}

          {/* SECTIONS */}
          <Box
            sx={{
              flex: 1,
              bgcolor: C.surface,
              borderRadius: 2,
              border: `1px solid ${C.border}`,
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: "clamp(20px, 2vw, 22px)",
              }}
            >
              Sections
            </Typography>

            <List dense sx={{ p: 0 }}>
              {module?.sectionNames.map((sec, index) => (
                <Box key={sec}>
                  <ListItem
                    sx={{
                      px: 0,
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <FiberManualRecordIcon
                        sx={{ fontSize: 10, color: C.textDim }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${index + 1}. ${sec}`}
                      primaryTypographyProps={{
                        variant: "body2",
                        sx: { color: C.text },
                      }}
                    />
                    <Chip
                      label="Preview"
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: "#263241",
                        color: C.textDim,
                        borderRadius: 1,
                        fontSize: 10,
                        height: 20,
                      }}
                    />
                  </ListItem>
                  {index !== module.sectionNames.length - 1 && (
                    <Divider
                      sx={{
                        borderColor: "rgba(255,255,255,0.04)",
                        my: 0.5,
                      }}
                    />
                  )}
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
