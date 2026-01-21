// PathOverviewPage.tsx
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  LinearProgress,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  enrollFromPath,
  getUserPathById,
  unenrollFromPath,
  type SimplePathWithModulesDetailsDto,
} from "./Services/PathsService";

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

type ActiveTab = "progress" | "details";

export default function PathOverviewPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("progress");
  const { id } = useParams();
  const navigate = useNavigate();
  const [pathInfo, setPathInfo] = useState<SimplePathWithModulesDetailsDto>();

  useEffect(() => {
    fetchModuleDetails();
  }, []);

  async function fetchModuleDetails() {
    await getUserPathById(id ?? "").then((path) => {
      setPathInfo(path);
      setActiveTab(path.hasStarted ? "progress" : "details");
      console.log(path);
    });
  }

  async function handleEnrollPath() {
    await enrollFromPath(id ?? "").then(() => {
      fetchModuleDetails();
    });
  }

  async function handleUnenrollPath() {
    await unenrollFromPath(id ?? "").then(() => {
      fetchModuleDetails();
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
          color: C.text,
          pb: 10,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 6 }}>
          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Box sx={{ maxWidth: 520 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  label="Enrolled Path"
                  sx={{
                    bgcolor: "#5c34f6",
                    color: "#fff",
                    fontWeight: 700,
                    height: 24,
                    borderRadius: 999,
                    fontSize: 11,
                  }}
                  size="small"
                />
                <Chip
                  label="JOB ROLE PATH"
                  sx={{
                    bgcolor: "#101927",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: C.textDim,
                    fontWeight: 700,
                    height: 24,
                    borderRadius: 999,
                    fontSize: 11,
                  }}
                  size="small"
                />
              </Stack>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 1,
                  fontSize: "clamp(28px, 4vw, 40px)",
                }}
              >
                {pathInfo?.name}
              </Typography>

              <Stack
                direction="row"
                spacing={3}
                sx={{ color: C.textDim, fontSize: 14, mb: 3 }}
              >
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Typography variant="body2">
                    {pathInfo?.difficulty}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Typography variant="body2">
                    {pathInfo?.estimatedHours}H
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Typography variant="body2">
                    {pathInfo?.modulesCount} Modules
                  </Typography>
                </Stack>
              </Stack>

              {/* Path Progress */}
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
                    Path progress
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: 14,
                      color: "#A6FA12",
                    }}
                  >
                    {pathInfo?.pathPercentCompleted ?? 0}% completed
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pathInfo?.pathPercentCompleted ?? 0}
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
                      backgroundColor: "#A6FA12",
                      backgroundImage: "none",
                    },
                  }}
                />
              </Box>

              {/* Start / Unenroll */}
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {!pathInfo?.hasStarted ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{
                      px: 4,
                      py: 1.4,
                      fontWeight: 800,
                      borderRadius: 1.5,
                      bgcolor: C.lime,
                      color: "#101927",
                      "&:hover": { bgcolor: "#b7ff2a" },
                    }}
                    onClick={() => handleEnrollPath()}
                  >
                    Enroll Path
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      sx={{
                        px: 4,
                        py: 1.4,
                        fontWeight: 800,
                        borderRadius: 1.5,
                        bgcolor: C.lime,
                        color: "#101927",
                        "&:hover": { bgcolor: "#b7ff2a" },
                      }}
                      onClick={() =>
                        navigate(
                          `/module/${pathInfo.nextModuleId}/section/${pathInfo.nextModuleLastSectionId}`
                        )
                      }
                    >
                      Start Path
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        px: 4,
                        py: 1.4,
                        fontWeight: 800,
                        borderRadius: 1.5,
                        borderWidth: 3,
                        borderStyle: "solid",
                        borderColor: "#ff4f5e66",
                        color: "#ff6b7a",
                        "&:hover": { borderColor: "#ff6b7a" },
                      }}
                      onClick={() => handleUnenrollPath()}
                    >
                      Unenroll Path
                    </Button>
                  </>
                )}
              </Stack>

              <Stack direction="row" spacing={1}>
                {pathInfo?.hasStarted && (
                  <Button
                    variant={activeTab === "progress" ? "contained" : "text"}
                    onClick={() => setActiveTab("progress")}
                    sx={{
                      px: 4,
                      borderRadius: 1.5,
                      fontWeight: 700,
                      bgcolor:
                        activeTab === "progress" ? "#1a2332" : "transparent",
                      color: activeTab === "progress" ? C.text : C.textDim,
                      borderBottom:
                        activeTab === "progress"
                          ? `2px solid ${C.lime}`
                          : "2px solid transparent",
                    }}
                  >
                    Progress
                  </Button>
                )}

                <Button
                  variant={activeTab === "details" ? "contained" : "text"}
                  onClick={() => setActiveTab("details")}
                  sx={{
                    px: 4,
                    borderRadius: 1.5,
                    fontWeight: 700,
                    bgcolor:
                      activeTab === "details" ? "#1a2332" : "transparent",
                    color: activeTab === "details" ? C.text : C.textDim,
                    borderBottom:
                      activeTab === "details"
                        ? `2px solid ${C.lime}`
                        : "2px solid transparent",
                  }}
                >
                  Path Details
                </Button>
              </Stack>
            </Box>

            {/* PRAWA STRONA – grafika (placeholder) */}
            <Box
              sx={{
                flex: 1,
                minHeight: 260,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  height: 260,
                  borderRadius: 2,
                  bgcolor: "#050813",
                  border: `1px solid ${C.border}`,
                }}
              />
            </Box>
          </Stack>

          {/* DOLNA CZĘŚĆ – WIDOK ZALEŻNY OD TABU */}
          <Box sx={{ mt: 6 }}>
            {activeTab === "progress" ? (
              <>
                {pathInfo?.startedModules != null &&
                  pathInfo?.startedModules.length > 0 && (
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        mb: 3,
                        fontSize: "clamp(20px, 3vw, 26px)",
                      }}
                    >
                      In Progress Modules
                    </Typography>
                  )}

                {pathInfo?.startedModules.map((module) => (
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      overflow: "hidden",
                    }}
                  >
                    {/* lewa pseudo-grafika */}
                    <Box
                      sx={{
                        width: 160,
                        bgcolor: "#050813",
                        borderRight: `1px solid ${C.border}`,
                      }}
                    />
                    {/* prawa część */}
                    <Box sx={{ flex: 1, p: 3, py: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1, mt: 1 }}>
                        <Chip
                          label="In Progress"
                          size="small"
                          sx={{
                            bgcolor: "#5c34f6",
                            color: "#fff",
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                        <Chip
                          label={module.tier}
                          size="small"
                          sx={{
                            bgcolor: "#101927",
                            color: C.textDim,
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                        <Chip
                          label={module.category}
                          size="small"
                          sx={{
                            bgcolor: "#101927",
                            color: C.textDim,
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {module.name}
                        </Typography>
                        <Button
                          variant="text"
                          sx={{
                            color: C.lime,
                            fontWeight: 500,
                            px: 0,
                            fontSize: 16,
                          }}
                          onClick={() =>
                            navigate(`/module-overview/${module.moduleId}`, {})
                          }
                        >
                          See Module
                        </Button>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ color: C.textDim, fontSize: 13, mb: 1 }}
                      >
                        <Typography>{module.difficulty}</Typography>
                        <Typography>{module.estimatedHours}h</Typography>
                        <Typography>Tier 0</Typography>
                      </Stack>
                    </Box>
                  </Box>
                ))}
                {pathInfo?.notStartedModules != null &&
                  pathInfo?.notStartedModules.length > 0 && (
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        mb: 3,
                        mt: 8,
                        fontSize: "clamp(20px, 3vw, 26px)",
                      }}
                    >
                      Modules
                    </Typography>
                  )}

                {pathInfo?.notStartedModules.map((module) => (
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      overflow: "hidden",
                    }}
                  >
                    {/* lewa pseudo-grafika */}
                    <Box
                      sx={{
                        width: 160,
                        bgcolor: "#050813",
                        borderRight: `1px solid ${C.border}`,
                      }}
                    />
                    {/* prawa część */}
                    <Box sx={{ flex: 1, p: 3, py: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1, mt: 1 }}>
                        <Chip
                          label="In Progress"
                          size="small"
                          sx={{
                            bgcolor: "#5c34f6",
                            color: "#fff",
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                        <Chip
                          label={module.tier}
                          size="small"
                          sx={{
                            bgcolor: "#101927",
                            color: C.textDim,
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                        <Chip
                          label={module.category}
                          size="small"
                          sx={{
                            bgcolor: "#101927",
                            color: C.textDim,
                            fontSize: 11,
                            borderRadius: 1,
                          }}
                        />
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {module.name}
                        </Typography>
                        <Button
                          variant="text"
                          sx={{
                            color: C.lime,
                            fontWeight: 500,
                            px: 0,
                            fontSize: 16,
                          }}
                        >
                          See Module
                        </Button>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ color: C.textDim, fontSize: 13, mb: 1 }}
                      >
                        <Typography>{module.difficulty}</Typography>
                        <Typography>{module.estimatedHours}h</Typography>
                        <Typography>Tier 0</Typography>
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <>
                {/* PATH DETAILS VIEW */}
                <Typography
                  variant="subtitle2"
                  sx={{ color: C.textDim, mb: 1 }}
                >
                  Path Includes
                </Typography>

                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: `1px solid ${C.border}`,
                    p: 3,
                    mb: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <Stack spacing={0.4}>
                    <Typography variant="caption" sx={{ color: C.textDim }}>
                      Modules
                    </Typography>
                    <Typography variant="body2">
                      {pathInfo?.modulesCount} Modules
                    </Typography>
                  </Stack>
                  <Stack spacing={0.4}>
                    <Typography variant="caption" sx={{ color: C.textDim }}>
                      Interactive Sections
                    </Typography>
                    <Typography variant="body2">
                      {pathInfo?.interactiveSectionsCount} Interactive Sections
                    </Typography>
                  </Stack>
                  <Stack spacing={0.4}>
                    <Typography variant="caption" sx={{ color: C.textDim }}>
                      Assessments
                    </Typography>
                    <Typography variant="body2">19 Assessment(s)</Typography>
                  </Stack>
                  <Stack spacing={0.4}>
                    <Typography variant="caption" sx={{ color: C.textDim }}>
                      Badge
                    </Typography>
                    <Typography variant="body2">Badge of Completion</Typography>
                  </Stack>
                  <Stack spacing={0.4}>
                    <Typography variant="caption" sx={{ color: C.textDim }}>
                      Cubes
                    </Typography>
                    <Typography variant="body2">
                      {pathInfo?.totalRewardAmount} Cubes
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    fontSize: "clamp(20px, 3vw, 26px)",
                  }}
                >
                  Path Description
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: C.textDim, lineHeight: 1.7, maxWidth: 820 }}
                >
                  {pathInfo?.description}
                </Typography>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
