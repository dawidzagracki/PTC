import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import {
  getUserPathsLists,
  type UserPathsListsDto,
} from "./Services/PathsService";
import { useNavigate } from "react-router-dom";
import default_module from "./assets/default_module.png";

const C = {
  bg: "#0F1726",
  panel: "#121B2A",
  card: "#121B2A",
  card2: "#101827",
  border: "rgba(255,255,255,0.07)",
  border2: "rgba(255,255,255,0.10)",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  tab: "#202B3B",
  purple: "#C35CFF",
  teal: "#34D6B6",
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

const pathImages = import.meta.glob(
  ["./assets/paths/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" }
) as Record<string, string>;

const pathImageMap = Object.fromEntries(
  Object.entries(pathImages).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const slug = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
    return [slug, url];
  })
);

const getPathImage = (slug: string) =>
  pathImageMap[slug.toLowerCase()] ?? default_module;

type PathCard = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  difficulty: string;
  time: string;
  modules: string;
  enrolled?: boolean;
  rolePath?: boolean;
  progressPercent?: number; // only for non-enrolled card with progress bar
};

function TabButton(props: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const { label, active, onClick } = props;

  return (
    <Button
      onClick={onClick}
      disableElevation
      variant={active ? "contained" : "text"}
      sx={{
        height: 44,
        px: 2.2,
        borderRadius: 1.6,
        fontWeight: 800,
        fontSize: 13.5,
        color: active ? "#0B1220" : "rgba(230,241,255,0.75)",
        bgcolor: active ? C.tab : "transparent",
        "&:hover": {
          bgcolor: active ? C.tab : "rgba(255,255,255,0.04)",
        },
      }}
    >
      {label}
    </Button>
  );
}

function EnrolledBadgeRow(props: { pathType: string; isEnrolled: boolean }) {
  const { pathType, isEnrolled = false } = props;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.2 }}>
      {isEnrolled && (
        <Chip
          label="Enrolled"
          size="small"
          sx={{
            height: 22,
            borderRadius: 1.1,
            bgcolor: "rgba(195,92,255,0.25)",
            color: "rgba(230,241,255,0.9)",
            fontWeight: 900,
            fontSize: 11.5,
          }}
        />
      )}

      <Stack direction="row" spacing={0.9} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: 99,
            bgcolor: C.teal,
            boxShadow: "0 0 0 3px rgba(52,214,182,0.10)",
          }}
        />
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "rgba(153,163,179,0.95)",
          }}
        >
          {pathType.toLocaleUpperCase()} ROLE PATH
        </Typography>
      </Stack>
    </Stack>
  );
}

function InfoRow(props: { difficulty: string; time: string; modules: string }) {
  const { difficulty, time, modules } = props;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", color: "rgba(153,163,179,0.95)", mt: 2 }}
    >
      <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
        <BarChartOutlinedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
        <Typography sx={{ fontSize: 13.5 }}>{difficulty}</Typography>
      </Stack>

      <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
        <AccessTimeOutlinedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
        <Typography sx={{ fontSize: 13.5 }}>{time}</Typography>
      </Stack>

      <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
        <ViewModuleOutlinedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
        <Typography sx={{ fontSize: 13.5 }}>{modules}</Typography>
      </Stack>
    </Stack>
  );
}

function EnrolledCardLarge(props: { card: PathCard }) {
  const { card } = props;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${C.border}`,
        bgcolor: "rgba(18,27,42,0.62)",
        boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
        overflow: "hidden",
        maxWidth: "100%",

        // --- KLUCZOWE ZMIANY DLA EFEKTU HOVER ---
        cursor: "pointer",
        transition: "all 0.25s ease-in-out", // Płynne przejście efektów
        "&:hover": {
          borderColor: "primary.main", // Podświetlenie ramki (możesz użyć np. "#3b82f6")
          bgcolor: "rgba(23, 35, 55, 0.8)", // Lekkie rozjaśnienie tła
          boxShadow: "0 22px 50px rgba(0,0,0,0.4)", // Mocniejszy cień (efekt uniesienia)
          transform: "translateY(-2px)", // Opcjonalnie: delikatny ruch w górę
        },
        // ---------------------------------------
      }}
      onClick={() => navigate(`/path/${card.id}`)}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "230px 1fr" },
          alignItems: "stretch",
          minHeight: 190,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(16,24,39,0.25)",
          }}
        >
          <Box
            component="img"
            src={getPathImage(card.slug)}
            alt={card.title}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              objectFit: "cover",
              border: `1px solid ${C.border}`,
            }}
          />
        </Box>

        <Box sx={{ pt: 2.5, pr: 1, position: "relative" }}>
          <EnrolledBadgeRow
            pathType={card.rolePath ? "JOB" : "SKILL"}
            isEnrolled={card.enrolled ?? false}
          />

          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "clamp(20px, 2.1vw, 23px)",
              lineHeight: 1.15,
              mb: 1.1,
            }}
          >
            {card.title}
          </Typography>

          <Typography
            sx={{
              color: "rgba(153,163,179,0.95)",
              lineHeight: 1.7,
              fontSize: 13.5,
              maxWidth: 520,
            }}
          >
            {card.desc.slice(0, 100)}...
          </Typography>

          <InfoRow
            difficulty={card.difficulty}
            time={card.time}
            modules={card.modules}
          />

          <IconButton
            sx={{
              position: "absolute",
              right: 14,
              bottom: 10,
              width: 38,
              height: 38,
              borderRadius: 2,
              color: "rgba(230,241,255,0.7)",
              // Możemy też podświetlić ikonę, gdy najeżdżamy na całą kartę
              ".MuiBox-root:hover &": {
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
              },
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function PathsLibraryPage() {
  const [tab, setTab] = React.useState<"all" | "skill" | "job">("all");

  const [paths, setPaths] = useState<UserPathsListsDto>();
  const [pathsCache, setPathCache] = useState<UserPathsListsDto>();

  useEffect(() => {
    fetchPaths();
  }, []);

  function handlePathsFilter(tab: "all" | "skill" | "job") {
    if (tab === "all") {
      setPaths(pathsCache);
    }
    if (tab === "skill") {
      setPaths({
        started:
          pathsCache?.started.filter((p) => p.pathType === "Skill") || [],
        notStarted:
          pathsCache?.notStarted.filter((p) => p.pathType === "Skill") || [],
      });
    }
    if (tab === "job") {
      setPaths({
        started: pathsCache?.started.filter((p) => p.pathType === "Job") || [],
        notStarted:
          pathsCache?.notStarted.filter((p) => p.pathType === "Job") || [],
      });
    }
  }

  async function fetchPaths() {
    const res = await getUserPathsLists();
    setPaths(res);
    setPathCache(res);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pt: 6,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          {/* TITLE */}
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "clamp(38px, 4.5vw, 56px)",
              letterSpacing: 0.2,
              mb: 4,
            }}
          >
            Paths
          </Typography>

          {/* TABS */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <TabButton
              label="All Paths"
              active={tab === "all"}
              onClick={() => {
                setTab("all");
                handlePathsFilter("all");
              }}
            />
            <TabButton
              label="Skill Paths"
              active={tab === "skill"}
              onClick={() => {
                setTab("skill");
                handlePathsFilter("skill");
              }}
            />
            <TabButton
              label="Job Role Paths"
              active={tab === "job"}
              onClick={() => {
                setTab("job");
                handlePathsFilter("job");
              }}
            />
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 5 }} />
          {paths?.started.length !== 0 && (
            <>
              {/* ENROLLED PATH */}
              <Typography sx={{ fontWeight: 900, fontSize: 18, mb: 2 }}>
                Enrolled Paths
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { lg: "1fr 1fr" },
                  gap: 2,
                  alignItems: "start",
                }}
              >
                {paths?.started.map((path) => (
                  <EnrolledCardLarge
                    card={{
                      id: path.id,
                      slug: path.slug,
                      title: path.name,
                      desc: path.description || "",
                      difficulty: path.difficulty,
                      time: `${path.estimatedHours}h`,
                      modules: `${path.modulesCount} Modules`,
                      enrolled: true,
                      rolePath: path.pathType === "Job" ? true : false,
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {paths?.notStarted.length !== 0 && (
            <>
              {/* ENROLLED PATH */}
              <Typography sx={{ fontWeight: 900, fontSize: 18, mb: 2 }}>
                Job Role Paths
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { lg: "1fr 1fr" },
                  gap: 2,
                  alignItems: "start",
                }}
              >
                {paths?.notStarted.map((path) => (
                  <EnrolledCardLarge
                    card={{
                      id: path.id,
                      slug: path.slug,
                      title: path.name,
                      desc: path.description || "",
                      difficulty: path.difficulty,
                      time: `${path.estimatedHours}h`,
                      modules: `${path.modulesCount} Modules`,
                      enrolled: true,
                      rolePath: path.pathType === "Job" ? true : false,
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
