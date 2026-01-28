import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  responsiveFontSizes,
  ThemeProvider,
  CssBaseline,
  createTheme,
  List,
  ListItem,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import MarkdownRenderer from "./Common/MarkdownRenderer";
import WestIcon from "@mui/icons-material/West";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import testMd from "./assets/md/test.md?raw";
import { useEffect, useState } from "react";
import {
  getModuleSectionPlayer,
  type ModuleSectionPlayerDto,
} from "./Services/LearningService";
import { useNavigate, useParams } from "react-router-dom";
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
  slug ? moduleImageMap[slug.toLowerCase()] ?? default_module : default_module;

export default function ModulePage() {
  const { moduleId, sectionId } = useParams();
  const navigate = useNavigate();
  const [moduleInfo, setModuleInfo] = useState<ModuleSectionPlayerDto>();
  const percentCompleted = Math.round(moduleInfo?.modulePercentCompleted ?? 0);
  useEffect(() => {
    fetchModuleDetails();
  }, [moduleId, sectionId]);

  async function fetchModuleDetails() {
    try {
      const module = await getModuleSectionPlayer(
        moduleId ?? "",
        sectionId ?? "",
      );
      setModuleInfo(module);
      console.log(module);
    } catch (error) {
      console.error("Nie udało się pobrać danych modułu.", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "#E6F1FF",
          minHeight: "100vh",
        }}
      >
        {/* Top strip (breadcrumbs / header row) */}
        <Box
          sx={{
            height: 66,
            px: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            bgcolor: "background.paper",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              bgcolor: "background.paper",
              maxWidth: 1150,
            }}
          >
            <WestIcon
              onClick={() => navigate(`/module-overview/${moduleId}`, {})}
              sx={{ cursor: "pointer" }}
            />

            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                component="img"
                src={getModuleImage(moduleInfo?.moduleSlug)}
                alt={moduleInfo?.moduleName ?? "Module"}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "4px",
                  opacity: 0.9,
                  objectFit: "cover",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {moduleInfo?.moduleName ?? " "}
                  </Typography>
                  <Typography sx={{ opacity: 0.6, fontSize: 14, ml: 2 }}>
                    {percentCompleted}%
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: 6,
                    bgcolor: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 999,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: `${percentCompleted}%`,
                      bgcolor: "#9AF80B",
                      borderRadius: 999,
                    }}
                  />
                </Box>
              </Box>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />
            {/* tiny help icons placeholders */}
            <Stack direction="row" spacing={2} sx={{ opacity: 0.8 }}>
              <IntegrationInstructionsIcon />
              <HelpOutlineIcon />
              <FormatListBulletedIcon />
            </Stack>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ pt: 3, pb: 16 }}>
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            {/* LEFT – article content */}
            <Box sx={{ flex: 1, maxWidth: 920, mt: 5 }}>
              <Typography sx={{ opacity: 0.7, fontSize: 13, mb: 1 }}>
                Section <b>{moduleInfo?.currentSectionNumber}</b> /{" "}
                {moduleInfo?.totalSectionsCount}
              </Typography>
              <MarkdownRenderer markdown={testMd} />
            </Box>

            {/* RIGHT – sticky Table of Contents */}
            <Box
              sx={{
                width: 420,
                position: "sticky",
                top: 72,
                alignSelf: "flex-start",
                bgcolor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
                pb: 4,
              }}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                }}
              >
                <Typography sx={{ fontWeight: 800 }}>
                  Table of Contents
                </Typography>
              </Box>

              <List disablePadding>
                {moduleInfo?.sections.map((x, index) => (
                  <Box key={index} sx={{}}>
                    <ListItem
                      sx={{ px: 2, py: 0.8 }}
                      onClick={() =>
                        navigate(`/module/${moduleId}/section/${x.id}`)
                      }
                    >
                      <Box
                        sx={{
                          bgcolor:
                            x.id === moduleInfo.sectionId
                              ? "rgba(125, 137, 148, 0.12)"
                              : "background.paper",
                          borderRadius: 2,
                          p: 2,
                          width: "100%",
                          border: "1px solid rgba(255,255,255,0.05)",
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            bgcolor: "rgba(145, 158, 171, 0.12)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
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
                              {index + 1}
                            </Box>

                            <Typography sx={{ fontWeight: 700 }}>
                              {x.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Box>
          </Box>
        </Container>

        {/* STICKY bottom action bar */}
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "background.paper",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            py: 1.5,
            zIndex: 1200,
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent={"space-between"}
              marginRight={6}
              marginLeft={6}
              paddingRight={1}
            >
              {moduleInfo?.currentSectionNumber === 1 ? (
                <Box></Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#E6F1FF",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                  }}
                  startIcon={<WestIcon />}
                  onClick={() =>
                    navigate(
                      `/module/${moduleId}/section/${
                        moduleInfo?.sections[
                          moduleInfo.currentSectionNumber - 2
                        ].id
                      }`
                    )
                  }
                >
                  Previous
                </Button>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    ml: "auto",
                    mr: 0,
                    px: 1.5,
                    py: 1,
                    bgcolor: "rgba(255,255,255,0.06)",
                    borderRadius: 999,
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <WhatshotIcon sx={{ color: "primary.main" }} />
                  +10
                </Box>
                {moduleInfo?.currentSectionNumber ===
                moduleInfo?.totalSectionsCount ? null : (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                      color: "#E6F1FF",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                    }}
                    onClick={() =>
                      navigate(
                        `/module/${moduleId}/section/${
                          moduleInfo?.sections[moduleInfo.currentSectionNumber]
                            .id
                        }`
                      )
                    }
                  >
                    Next
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#A6FA12",
                    color: "#0A0F1E",
                    fontWeight: 800,
                    "&:hover": { bgcolor: "#9BE40F" },
                  }}
                >
                  {moduleInfo?.currentSectionNumber ===
                  moduleInfo?.totalSectionsCount
                    ? "Finish"
                    : "Mark Complete & Next"}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
