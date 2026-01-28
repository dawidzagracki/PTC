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
  CircularProgress,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getModuleDetailsById,
  unlockModule,
  toggleModuleFavourite,
  type SimpleModuleDetails,
} from "./Services/ModulesService";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import default_module from "./assets/default_module.png";

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

const moduleImages = import.meta.glob(
  ["./assets/modules/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" },
) as Record<string, string>;

const moduleImageMap = Object.fromEntries(
  Object.entries(moduleImages).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const slug = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
    return [slug, url];
  }),
);

const getModuleImage = (slug?: string | null) =>
  slug
    ? (moduleImageMap[slug.toLowerCase()] ?? default_module)
    : default_module;

export default function ModuleOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moduleInfo, setModuleInfo] = useState<SimpleModuleDetails>();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );
  const [tabValue, setTabValue] = useState(0);
  const hasProgress = (moduleInfo?.userPercentCompleted ?? 0) > 0;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    fetchModuleDetails();
  }, []);

  async function fetchModuleDetails() {
    try {
      const module = await getModuleDetailsById(id ?? "");
      setModuleInfo(module);
      setIsFavourite(module.isFavourite);
      console.log(module);
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Nie udało się pobrać szczegółów modułu.");
      setAlertOpen(true);
    }
  }

  const handleUnlock = async () => {
    if (!id) return;
    try {
      setIsUnlocking(true);
      await unlockModule(id);
      await fetchModuleDetails();
      setAlertSeverity("success");
      setAlertMessage("Moduł odblokowany pomyślnie.");
      setAlertOpen(true);
    } catch (error: any) {
      const message =
        error?.response?.data ?? "Błąd podczas transakcji. Spróbuj ponownie.";
      setAlertSeverity("error");
      setAlertMessage(message);
      setAlertOpen(true);
    } finally {
      setIsUnlocking(false);
    }
  };

  const getModuleAction = () => {
    if (!moduleInfo?.isStarted) {
      return {
        label: `Unlock Module • ${moduleInfo?.price ?? 0} CyberChips`,
        onClick: handleUnlock,
        disabled: isUnlocking,
      };
    }

    const status = (moduleInfo.userStatus ?? "").toUpperCase();
    const firstSectionId =
      moduleInfo.currentSectionId ?? moduleInfo.sections?.[0]?.id;

    if (status === "NOT_STARTED") {
      return {
        label: "Start Module",
        onClick: () => {
          if (!firstSectionId) return;
          navigate(`/module/${id}/section/${firstSectionId}`);
        },
        disabled: false,
      };
    }

    return {
      label: "Continue Module",
      onClick: () => {
        if (!firstSectionId) return;
        navigate(`/module/${id}/section/${firstSectionId}`);
      },
      disabled: false,
    };
  };

  const handleFavouriteToggle = async () => {
    if (!id) return;
    try {
      const newValue = await toggleModuleFavourite(id);
      setIsFavourite(newValue);
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Nie udało się zaktualizować ulubionego modułu.");
      setAlertOpen(true);
    }
  };

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
              <Typography sx={{ fontWeight: 900, mb: 1, fontSize: 48 }}>
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
                  {hasProgress && (
                    <>
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
                    </>
                  )}
                </Box>
              )}

              {/* Button + Favorite */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {moduleInfo && (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#A6FA12",
                      color: "#0A0F1E",
                      fontWeight: 700,
                    }}
                    disabled={getModuleAction().disabled}
                    onClick={getModuleAction().onClick}
                    startIcon={
                      isUnlocking ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : undefined
                    }
                  >
                    {isUnlocking ? "Processing..." : getModuleAction().label}
                  </Button>
                )}

                <Box
                  sx={{ ml: 3, mt: 1, cursor: "pointer" }}
                  onClick={handleFavouriteToggle}
                  role="button"
                  aria-pressed={isFavourite}
                >
                  {isFavourite ? (
                    <FavoriteIcon sx={{ color: "#FF1744" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Box>
              </Box>
            </Box>

            {/* Placeholder for large right image (removed) */}
            <Box
              sx={{
                width: "40%",
                height: 260,

                borderRadius: 2,
                bgcolor: "#0F1529",
                ml: "auto",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={getModuleImage(moduleInfo?.slug)}
                alt={moduleInfo?.name ?? "Module"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  fontSize: 48,
                }}
              />
            </Box>
          </Box>

          {/* TAB SWITCHER */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgba(255,255,255,0.15)",
              mt: 6,
              mb: 4,
              position: "relative",
            }}
          >
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
              <Tab label="Progress" />
              <Tab label="Module Details" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <>
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                  disabled={getModuleAction().disabled}
                  onClick={getModuleAction().onClick}
                >
                  Start Module
                </Button>
              </Box>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 2 }} />
            </>
          )}

          {tabValue === 1 && (
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Summary</Typography>
                <Typography sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                  {moduleInfo?.summary ?? "No summary available yet."}
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>
                  Description
                </Typography>
                <Typography sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                  {moduleInfo?.description ?? "No description available yet."}
                </Typography>
              </Box>
            </Stack>
          )}
        </Container>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3500}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="outlined"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            borderColor:
              alertSeverity === "success"
                ? "rgba(166,250,18,0.6)"
                : "rgba(244,67,54,0.6)",
            "& .MuiAlert-icon": {
              color:
                alertSeverity === "success"
                  ? "rgba(166,250,18,0.9)"
                  : "rgba(244,67,54,0.9)",
            },
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
