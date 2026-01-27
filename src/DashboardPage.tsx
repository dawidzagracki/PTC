import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  LinearProgress,
  Chip,
  responsiveFontSizes,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Tabs,
  Tab,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import FeedIcon from "@mui/icons-material/Feed";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import {
  getUserEnrolledPaths,
  type PathDetailsDto,
  type PathModuleWithProgressDto,
} from "./Services/PathsService";
import {
  getAllModulesWithUserProgress,
  type ModuleWithUserProgressDto,
  type SectionWithUserProgressDto,
} from "./Services/ModulesService";
import { useNavigate } from "react-router-dom";
import default_module from "./assets/default_module.png";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

// Colors & tokens (HTB-like)
const C = {
  bg: "#0A0F1E",
  surface: "#0F1529",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
  borderSoft: "rgba(255,255,255,0.04)",
};

const moduleImages = import.meta.glob(
  ["./assets/modules/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" }
) as Record<string, string>;

const pathImages = import.meta.glob(
  ["./assets/paths/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" }
) as Record<string, string>;

const toSlugMap = (images: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(images).map(([path, url]) => {
      const fileName = path.split("/").pop() ?? "";
      const slug = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
      return [slug, url];
    })
  );

const moduleImageMap = toSlugMap(moduleImages);
const pathImageMap = toSlugMap(pathImages);

const getModuleImage = (slug?: string | null) =>
  slug ? moduleImageMap[slug.toLowerCase()] ?? default_module : default_module;
const getPathImage = (slug?: string | null) =>
  slug ? pathImageMap[slug.toLowerCase()] ?? default_module : default_module;

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

function Tag({ label, width = 120 }: { label: string; width?: number }) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: "#0A1020",
        color: C.textDim,
        borderRadius: 1,
        fontWeight: 700,
        width: { width },
        height: 22,
      }}
    />
  );
}

function RowSection({
  title,
  complete,
  isInProgress,
  moduleId,
  sectionId,
}: {
  title: string;
  complete?: boolean;
  isInProgress?: boolean;
  moduleId: string;
  sectionId: string;
}) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: 2,
        py: 1.95,
        cursor: "pointer",
        transition: "background-color 0.2s ease", // Płynne przejście tła
        backgroundColor: isInProgress ? "#242f40" : "#1a2332",

        // --- LOGIKA HOVER ---
        "&:hover": {
          backgroundColor: "#2f3e53ff",
          "& .hover-arrow": {
            opacity: 1, // Pokazuje strzałkę
            transform: "translateX(0)", // Opcjonalnie: lekki ruch w prawo
          },
        },
      }}
      onClick={() => navigate(`/module/${moduleId}/section/${sectionId}`)}
    >
      {/* icon placeholder */}
      {complete ? (
        <CheckCircleIcon sx={{ color: C.lime, width: 28, height: 28 }} />
      ) : (
        // <Box
        //   sx={{
        //     width: 28,
        //     height: 28,
        //     borderRadius: 1,
        //     bgcolor: "#0A0F1E",
        //     border: `1px solid ${C.borderSoft}`,
        //   }}
        // />
        <Box
          sx={{
            width: 34,
            height: 34,
            bgcolor: "background.default",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FeedIcon sx={{ color: C.textDim }} />
        </Box>
      )}

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tag label="ARTICLE" width={70} />
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        </Stack>
      </Box>

      {/* Kontener na status i strzałkę */}
      <Stack direction="row" spacing={1} alignItems="center">
        {isInProgress && (
          <Typography sx={{ color: C.lime, fontWeight: 700, pr: 1 }}>
            In Progress
          </Typography>
        )}

        {/* STRZAŁKA: Widoczna tylko po najechaniu */}
        <ArrowForwardIosIcon
          className="hover-arrow"
          sx={{
            width: 16,
            height: 16,
            color: C.textDim,
            opacity: 0, // Domyślnie ukryta
            transform: "translateX(-5px)", // Startuje lekko z lewej
            transition: "all 0.2s ease", // Płynne pojawianie się
          }}
        />
      </Stack>
    </Stack>
  );
}

function Row({
  title,
  complete,
  tag,
  moduleId,
  moduleSlug,
}: {
  title: string;
  complete?: boolean;
  tag: string;
  moduleId: string;
  moduleSlug: string;
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        px: 2,
        py: 1.75,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* icon placeholder */}
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          bgcolor: "#0A0F1E",
          border: `1px solid ${C.borderSoft}`,
          mr: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={getModuleImage(moduleSlug)}
          alt={title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ flex: 1, mr: 2 }}>
        <Stack direction="column" spacing={1} justifyContent={"left"}>
          <Tag label={tag} width={70} />
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        </Stack>
      </Box>

      {complete ? (
        <>
          <CheckCircleIcon sx={{ color: C.lime, width: 19, pt: 0.3 }} />
          <Typography sx={{ color: C.lime, fontWeight: 700 }}>
            Completed
          </Typography>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              width: 160,
              height: 6,
              mr: 1.5,
              borderRadius: 999,
              overflow: "hidden",

              /* TRACK – paski */
              backgroundColor: "#131a2a",
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.28) 0 5px, rgba(255,255,255,0.06) 5px 10px)",
              backgroundSize: "14px 14px",

              /* BAR */
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.18)",
                backgroundImage: "none",
              },
            }}
          />

          <Typography sx={{ color: C.textDim, fontWeight: 700, mr: 3 }}>
            0%
          </Typography>

          <Button
            sx={{
              height: 30,
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              color: C.text,
              "&:hover": {
                backgroundColor: "#2f3e535e",
              },
            }}
            onClick={() => navigate(`/module-overview/${moduleId}`, {})}
          >
            <ArrowForwardIosIcon sx={{ height: 16 }} />
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default function DashboardPage() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const [paths, setPaths] = useState<PathDetailsDto>();
  const [module, setModule] = useState<ModuleWithUserProgressDto>();
  const hasEnrolledPath = Boolean(paths?.id);

  useEffect(() => {
    const isOnBoarded = localStorage.getItem("isOnBoarded") === "true";
    if (!isOnBoarded) {
      navigate("/on-boarding");
      return;
    }

    fetchPaths();
    fetchModules();
  }, [navigate]);

  async function fetchPaths() {
    try {
      const result = await getUserEnrolledPaths();
      setPaths(result);
      console.log(result);
    } catch (error) {
      console.error("Nie udało się pobrać ścieżek użytkownika.", error);
    }
  }

  async function fetchModules() {
    try {
      const result = await getAllModulesWithUserProgress();
      setModule(result);
    } catch (error) {
      console.error("Nie udało się pobrać modułów użytkownika.", error);
    }
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
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
          {/* Page title */}
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
            Welcome {username}
          </Typography>

          <Box
            sx={{
              borderBottom: 1,
              borderColor: C.border,
              mb: 2,
              position: "relative",
            }}
          >
            <Tabs
              value={hasEnrolledPath ? tabValue : 0}
              onChange={(_, v) => setTabValue(hasEnrolledPath ? v : 0)}
            >
              {hasEnrolledPath && <Tab label="Enrolled Path" />}
              <Tab label="Modules In Progress" />
            </Tabs>
          </Box>

          {/* Two columns */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            alignItems="flex-start"
          >
            {/* LEFT: Path + Modules */}
            {hasEnrolledPath && tabValue === 0 ? (
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "background.paper",
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {/* Enrolled Path header */}
                <Box
                  sx={{
                    p: 2.5,
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#2f3e535e",
                    },
                    cursor: "pointer",
                    borderRadius: 3,
                    mb: 2,
                  }}
                  onClick={() => navigate(`/path/${paths?.id}`)}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          bgcolor: "#0A0F1E",
                          border: `1px solid ${C.borderSoft}`,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={getPathImage(paths?.slug)}
                          alt={paths?.name ?? "Path"}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mb: 0.5 }}
                        >
                          <Chip
                            size="small"
                            label="Enrolled"
                            sx={{
                              bgcolor: "#b41cb9ff",
                              color: C.text,
                              borderRadius: 1,
                              height: 20,
                            }}
                          />
                          <Chip
                            size="small"
                            label="SKILL PATH"
                            sx={{
                              bgcolor: "#2e3146",
                              color: C.textDim,
                              borderRadius: 1,
                              height: 20,
                            }}
                          />
                        </Stack>
                        <Typography sx={{ fontWeight: 800 }}>
                          {paths?.name}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          sx={{ color: C.textDim, mt: 0.5 }}
                        >
                          <Typography>{paths?.difficulty}</Typography>
                          <Typography>9d 10h 0m</Typography>
                          <Typography>
                            {paths?.modules.length} Modules
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Progress to the right */}
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 16, color: C.lime }}
                    >
                      See Full Path
                    </Typography>
                  </Stack>
                </Box>

                {/* Modules header */}
                <Box
                  sx={{
                    borderWidth: 1,
                    borderColor: C.border,
                    borderStyle: "solid",
                    borderRadius: 4,
                    width: "96%",
                  }}
                >
                  <Box
                    sx={{
                      px: 2.5,
                      py: 1.5,
                      borderBottom: `1px solid ${C.borderSoft}`,
                      height: 70,
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                      Modules
                    </Typography>
                    <Typography sx={{ color: C.textDim, fontSize: 17 }}>
                      {paths?.modules.length} Modules
                    </Typography>
                  </Box>

                  <Box sx={{ maxHeight: 420, overflow: "auto" }}>
                    {paths?.modules.map(
                      (x: PathModuleWithProgressDto, i: number) => (
                        <Row
                          title={x.moduleName}
                          complete={x.userPercentCompleted == 100}
                          tag={x.tag}
                          key={i}
                          moduleId={module?.id ?? ""}
                          moduleSlug={x.moduleSlug}
                        />
                      )
                    )}
                  </Box>
                </Box>

                {/* Footer buttons */}
                <Box
                  sx={{
                    p: 2.5,
                    mt: 2,
                    display: "flex",
                    justifyContent: "right",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{ color: C.text, px: 2 }}
                    onClick={() => navigate(`/path/${paths?.id}`)}
                  >
                    See Full Path
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: C.lime, color: "#0A0F1E", fontWeight: 700 }}
                    onClick={() =>
                      navigate(
                        `/module/${paths?.nextModuleId}/section/${paths?.nextModuleLastSectionId}`
                      )
                    }
                  >
                    Continue Learning
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "background.paper",
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {/* Enrolled Path header */}
                <Box
                  sx={{
                    p: 2.5,
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#2f3e535e",
                    },
                    cursor: "pointer",
                    borderRadius: 3,
                    mb: 2,
                  }}
                  onClick={() => navigate(`/module-overview/${module?.id}`)}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          bgcolor: "#0A0F1E",
                          border: `1px solid ${C.borderSoft}`,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={getModuleImage(module?.slug)}
                          alt={module?.name ?? "Module"}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mb: 0.5 }}
                        >
                          <Chip
                            size="small"
                            label="In Progress"
                            sx={{
                              bgcolor: "#b41cb9ff",
                              color: C.text,
                              borderRadius: 1,
                              height: 20,
                            }}
                          />
                          <Chip
                            size="small"
                            label="GENERAL"
                            sx={{
                              bgcolor: "#2e3146",
                              color: C.textDim,
                              borderRadius: 1,
                              height: 20,
                            }}
                          />
                        </Stack>
                        <Typography sx={{ fontWeight: 800 }}>
                          {module?.name}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          sx={{ color: C.textDim, mt: 0.5 }}
                        >
                          <Typography>{module?.difficulty}</Typography>
                          <Typography>9d 7h 30 min</Typography>
                          <Typography>
                            {module?.sectionsCount} Sections
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Progress to the right */}
                    <Box sx={{ minWidth: 220 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={paths?.userPercentCompleted ?? 0}
                            sx={{
                              height: 8,
                              borderRadius: 999,
                              overflow: "hidden",
                              backgroundColor: "#131a2a",
                              backgroundImage:
                                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.35) 0 6px, rgba(255,255,255,0.08) 6px 12px)",

                              backgroundSize: "16px 16px",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 999,
                                backgroundColor: C.lime,
                                backgroundImage: "none",
                              },
                            }}
                          />
                        </Box>
                        <Typography sx={{ width: 25, textAlign: "right" }}>
                          {module?.userPercentCompleted}%
                        </Typography>
                        <KeyboardArrowRightIcon />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* Modules header */}
                <Box
                  sx={{
                    borderWidth: 1,
                    borderColor: C.border,
                    borderStyle: "solid",
                    borderRadius: 4,
                    width: "96%",
                  }}
                >
                  <Box
                    sx={{
                      py: 1.5,
                      px: 2,
                      height: 70,
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                        Sections
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Typography sx={{ color: C.textDim, fontSize: 17 }}>
                        1/{module?.sectionsCount} Sections
                      </Typography>
                      {isCollapsed ? (
                        <KeyboardArrowUpIcon sx={{ color: C.textDim }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ color: C.textDim }} />
                      )}
                    </Box>
                  </Box>

                  {!isCollapsed && (
                    <Box
                      sx={{ maxHeight: 420, overflow: "auto", borderRadius: 4 }}
                    >
                      {module?.sections.map(
                        (x: SectionWithUserProgressDto, i: number) => (
                          <RowSection
                            title={x.name}
                            complete={x.isCompleted}
                            isInProgress={
                              module.lastSectionId === x.id && !x.isCompleted
                            }
                            moduleId={module.id}
                            sectionId={x.id}
                            key={i}
                          />
                        )
                      )}
                    </Box>
                  )}
                </Box>

                {/* Footer buttons */}
                <Box
                  sx={{
                    p: 2.5,
                    mt: 2,
                    display: "flex",
                    justifyContent: "right",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{ color: C.text, px: 2 }}
                    onClick={() => navigate(`/module-overview/${module?.id}`)}
                  >
                    See Full Module
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: C.lime, color: "#0A0F1E", fontWeight: 700 }}
                    onClick={() =>
                      navigate(
                        `/module/${module?.id}/section/${module?.lastSectionId}`
                      )
                    }
                  >
                    Continue Learning
                  </Button>
                </Box>
              </Box>
            )}

            {/* RIGHT: Sidebar */}
            <Box
              sx={{
                width: { xs: "100%", lg: 360 },
                position: { lg: "sticky" },
                top: { lg: 24 },
                mt: { xs: 0, lg: -1.5 },
              }}
            >
              {/* Profile card */}
              <Box
                sx={{
                  position: "relative",
                  bgcolor: "#1a2332",
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  p: 2.5,
                  pb: 0,
                  pt: 2,
                  mb: 3,
                }}
              >
                {/* Floating avatar (half outside, 3D feel) */}
                <Box
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: -50,
                    width: 89,
                    height: 89,
                    borderRadius: "50%",
                    bgcolor: C.lime,
                    boxShadow:
                      "0 12px 24px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.22)",
                    border: `3px solid ${C.bg}`,
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography sx={{ fontWeight: 800 }}>{username}</Typography>
                  <Box sx={{ width: 64 }} />
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ color: C.textDim, mb: 3, mt: 9 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      borderRight: 1,
                      pr: 1,
                      borderColor: C.border,
                    }}
                  >
                    <BoltIcon />
                    <Typography>Free</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRight: 1,
                      pr: 1,
                      borderColor: C.border,
                    }}
                  >
                    <ViewInArIcon sx={{ mr: 0.5 }} />
                    <Typography sx={{ mr: 1 }}>20</Typography>
                    <ControlPointIcon sx={{ color: "white" }} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      pr: 1,
                    }}
                  >
                    <LocalActivityIcon sx={{ mr: 0.5 }} />
                    <Typography sx={{ mr: 1 }}>20</Typography>
                    <ControlPointIcon sx={{ color: "white" }} />
                  </Box>
                </Stack>

                {/* <Divider sx={{ borderColor: C.border, my: 2 }} />

                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  Weekly Streak
                </Typography>
                <Typography sx={{ color: C.textDim, mb: 1 }}>
                  0/30 points
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={0}
                  sx={{ height: 8, bgcolor: "#131a2a" }}
                /> */}
              </Box>

              {/* Progress buckets */}
              <Typography sx={{ fontWeight: 800, mb: 1.5 }}>
                Academy General Progress
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 2,
                }}
              >
                {[
                  {
                    title: "OFFENSIVE",
                    value: 1.5,
                    icon: (
                      <SportsMmaIcon
                        sx={{ width: 18, height: 18, color: "#FF4D4D" }}
                      />
                    ),
                  },
                  {
                    title: "DEFENSIVE",
                    value: 0,
                    icon: (
                      <GppGoodOutlinedIcon
                        sx={{ width: 18, height: 18, color: "#4DA3FF" }}
                      />
                    ),
                  },
                  {
                    title: "GENERAL",
                    value: 11.8,
                    icon: (
                      <ArticleOutlinedIcon
                        sx={{ width: 18, height: 18, color: "#C9D3E3" }}
                      />
                    ),
                  },
                  {
                    title: "PURPLE",
                    value: 0,
                    icon: (
                      <ShieldOutlinedIcon
                        sx={{ width: 18, height: 18, color: "#A855F7" }}
                      />
                    ),
                  },
                ].map((x) => (
                  <Box
                    key={x.title}
                    sx={{
                      bgcolor: "#1a2332",
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      {x.icon}
                      <Typography
                        sx={{
                          fontWeight: 900,
                          letterSpacing: 0.4,
                          fontSize: 12,
                          color: C.textDim,
                        }}
                      >
                        {x.title}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{ fontWeight: 900, fontSize: 28, lineHeight: 1 }}
                    >
                      {x.value}%
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={x.value}
                      sx={{
                        mt: 1.5,
                        height: 6,
                        borderRadius: 999,
                        overflow: "hidden",

                        /* TRACK – paski */
                        backgroundColor: "#131a2a",
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, rgba(255,255,255,0.28) 0 5px, rgba(255,255,255,0.06) 5px 10px)",
                        backgroundSize: "14px 14px",

                        /* BAR */
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          backgroundColor:
                            x.title === "GENERAL"
                              ? C.lime
                              : "rgba(255,255,255,0.18)",
                          backgroundImage: "none",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// MODULES IN PROGRESS SIDE SCROOL
// {/* <Box sx={{ justifyContent: "space-between", display: "flex" }}>
//             <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, mt: 10 }}>
//               Modules In Progress
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "right" }}>
//               <Typography
//                 sx={{
//                   mt: 14,
//                   mr: 3,
//                   cursor: "pointer",
//                   fontWeight: 700,
//                   fontSize: 14,
//                 }}
//               >
//                 View all Modules in Progress
//               </Typography>
//               {/* <Box
//                 sx={{
//                   bgcolor: "#55555580",
//                   p: 0.5,
//                   pl: 1,
//                   mr: 3,
//                   mt: 13,
//                   borderRadius: 1,
//                   alignContent: "center",
//                   height: 27,
//                 }}
//               >
//                 <ArrowBackIosIcon sx={{ width: 18 }} />
//               </Box> */}
//               <Box sx={{ display: "flex", gap: 0.1, mt: 12 }}>
//                 <img src={arrowLeft} width={45} height={45} />
//                 <img src={arrowRight} width={45} height={45} />
//               </Box>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               gap: 3,
//               justifyContent: "space-between",
//               mb: 3,
//               width: "100%",
//             }}
//           >
//             <Box
//               sx={{
//                 position: "relative",
//                 bgcolor: "background.paper",
//                 borderRadius: 4,
//                 width: "29%",
//                 p: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "10%",
//                   left: "8%",
//                   bgcolor: "#C47CFF",
//                   color: "#000",
//                   px: 0.7,
//                   py: 0.1,
//                   borderRadius: 0.7,
//                   fontSize: 12,
//                   fontWeight: 700,
//                   zIndex: 10,
//                 }}
//               >
//                 In Progress
//               </Box>
//               <img src={linux} width="100%" />
//               <Typography sx={{ fontSize: 15 }}>Regular General</Typography>
//               <Typography sx={{ fontSize: 24 }}>Linux</Typography>
//               <Divider sx={{ my: 1 }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Typography
//                     sx={{
//                       fontSize: 14,
//                       borderRight: 1,
//                       borderWidth: 2,
//                       pr: 1,
//                       borderColor: C.border,
//                     }}
//                   >
//                     Fundamental
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontSize: 14,
//                       borderRight: 1,
//                       borderWidth: 2,
//                       pr: 1,
//                       ml: 1,
//                       borderColor: C.border,
//                     }}
//                   >
//                     6h
//                   </Typography>
//                   <Typography sx={{ fontSize: 14, ml: 1 }}>Tier 0</Typography>
//                 </Box>
//                 <ArrowForwardIosIcon sx={{ width: 17 }} />
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 bgcolor: "background.paper",
//                 borderRadius: 4,
//                 width: "29%",
//               }}
//             >
//               <Typography>Linux</Typography>
//             </Box>
//             <Box
//               sx={{
//                 bgcolor: "background.paper",
//                 borderRadius: 4,
//                 width: "29%",
//               }}
//             >
//               <Typography>Linux</Typography>
//             </Box>
//             <Box
//               sx={{
//                 bgcolor: "background.paper",
//                 borderRadius: 4,
//                 width: "29%",
//               }}
//             >
//               <Typography>Linux</Typography>
//             </Box>
//           </Box> */}
