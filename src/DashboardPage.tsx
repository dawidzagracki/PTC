import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  Divider,
  LinearProgress,
  Chip,
  responsiveFontSizes,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import linux from "./assets/linux.png";
import arrowLeft from "./assets/arrow-left.png";
import arrowRight from "./assets/arrow-right.png";
import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
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

function Tag({ label }: { label: string }) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: "#0A1020",
        color: C.textDim,
        borderRadius: 1,
        fontWeight: 700,
        height: 22,
      }}
    />
  );
}

function RowSection({
  title,
  complete,
}: {
  title: string;
  complete?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: 2,
        py: 1.25,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#2f3e53ff",
        },
        backgroundColor: complete ? "#242f40" : "#1a2332",
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
        }}
      />

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tag label="ARTICLE" />
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        </Stack>
      </Box>

      {complete ? (
        <>
          <Typography sx={{ color: C.lime, fontWeight: 700 }}>
            In Progress
          </Typography>
        </>
      ) : (
        <>
          {/* <Typography sx={{ color: C.textDim, fontWeight: 700 }}>0%</Typography>
          <ArrowForwardIosIcon sx={{ width: 16, height: 16 }} /> */}
        </>
      )}
    </Stack>
  );
}

function Row({
  title,
  complete,
  showBar,
}: {
  title: string;
  complete?: boolean;
  showBar?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: 2,
        py: 1.25,
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
        }}
      />

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tag label="GENERAL" />
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        </Stack>
        {showBar && (
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              mt: 1,
              height: 6,
              bgcolor: "#131a2a",
              "& .MuiLinearProgress-bar": { bgcolor: C.border },
            }}
          />
        )}
      </Box>

      {complete ? (
        <>
          <CheckCircleIcon sx={{ color: C.lime, width: 19, pt: 0.3 }} />
          <Typography sx={{ color: C.lime, fontWeight: 700 }}>
            Completed
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ color: C.textDim, fontWeight: 700 }}>0%</Typography>
          <ArrowForwardIosIcon sx={{ width: 16, height: 16 }} />
        </>
      )}
    </Stack>
  );
}

export default function DashboardPage() {
  const username = localStorage.getItem("username");
  const [showPw, setShowPw] = React.useState(false);

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

          {/* Tabs */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ position: "relative", mb: 2 }}
          >
            <Box sx={{ minWidth: 100 }}>
              {" "}
              {/* <-- DODANE minWidth */}
              <Typography
                sx={{
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 16,
                  color: !showPw ? C.text : C.textDim,
                }}
                onClick={() => setShowPw(false)}
              >
                Enrolled Path
              </Typography>
              {!showPw && (
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    bgcolor: C.lime,
                    mt: 1,
                    borderRadius: 3,
                  }}
                />
              )}
            </Box>

            <Box sx={{ minWidth: 160 }}>
              {" "}
              {/* <-- DODANE minWidth */}
              <Typography
                sx={{
                  color: showPw ? C.text : C.textDim,
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 16,
                }}
                onClick={() => setShowPw(true)}
              >
                Modules In Progress
              </Typography>
              {showPw && (
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    bgcolor: C.lime,
                    mt: 1,
                    borderRadius: 3,
                  }}
                />
              )}
            </Box>
          </Stack>

          {/* Two columns */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            alignItems="flex-start"
          >
            {/* LEFT: Path + Modules */}
            {!showPw ? (
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
                <Box sx={{ p: 2.5, width: "100%" }}>
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
                        }}
                      />
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
                          Information Security Foundations
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          sx={{ color: C.textDim, mt: 0.5 }}
                        >
                          <Typography>Easy</Typography>
                          <Typography>9d 7h 30 min</Typography>
                          <Typography>12 Modules</Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Progress to the right */}
                    <Box sx={{ minWidth: 220 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={25}
                            sx={{
                              height: 8,
                              bgcolor: "#131a2a",
                              "& .MuiLinearProgress-bar": { bgcolor: C.lime },
                            }}
                          />
                        </Box>
                        <Typography sx={{ width: 40, textAlign: "right" }}>
                          25%
                        </Typography>
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
                      px: 2.5,
                      py: 1.5,
                      borderBottom: `1px solid ${C.borderSoft}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography sx={{ fontWeight: 800 }}>Modules</Typography>
                      <Typography sx={{ color: C.textDim }}>
                        3/12 Modules
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Scrollable list area like original */}
                  <Box sx={{ maxHeight: 420, overflow: "auto" }}>
                    <Row title="Intro To Academy" complete />
                    <Row title="Learning Process" complete />
                    <Row title="Setting Up" complete />
                    <Row title="Linux Fundamentals" showBar />
                    <Row title="Windows Fundamentals" showBar />
                  </Box>
                </Box>

                {/* Footer buttons */}
                <Box
                  sx={{
                    p: 2.5,
                    display: "flex",
                    justifyContent: "right",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Button variant="text" sx={{ color: C.text, px: 2 }}>
                    See Full Path
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: C.lime, color: "#0A0F1E", fontWeight: 700 }}
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
                <Box sx={{ p: 2.5, width: "100%" }}>
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
                        }}
                      />
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
                          Linux Fundamentals
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          sx={{ color: C.textDim, mt: 0.5 }}
                        >
                          <Typography>Easy</Typography>
                          <Typography>9d 7h 30 min</Typography>
                          <Typography>12 Modules</Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Progress to the right */}
                    <Box sx={{ minWidth: 220 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={25}
                            sx={{
                              height: 8,
                              bgcolor: "#131a2a",
                              "& .MuiLinearProgress-bar": { bgcolor: C.lime },
                            }}
                          />
                        </Box>
                        <Typography sx={{ width: 40, textAlign: "right" }}>
                          25%
                        </Typography>
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
                      borderBottom: `1px solid ${C.borderSoft}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography sx={{ fontWeight: 800 }}>Modules</Typography>
                      <Typography sx={{ color: C.textDim }}>
                        1/3 Sections
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Scrollable list area like original */}
                  <Box sx={{ maxHeight: 420, overflow: "auto" }}>
                    <RowSection title="Intro To Academy" complete={false} />
                    <RowSection title="Learning Process" complete />
                    <RowSection title="Setting Up" complete={false} />
                  </Box>
                </Box>

                {/* Footer buttons */}
                <Box
                  sx={{
                    p: 2.5,
                    display: "flex",
                    justifyContent: "right",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Button variant="text" sx={{ color: C.text, px: 2 }}>
                    See Full Module
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: C.lime, color: "#0A0F1E", fontWeight: 700 }}
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

                <Divider sx={{ borderColor: C.border, my: 2 }} />

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
                />
              </Box>

              {/* Progress buckets */}
              <Typography sx={{ fontWeight: 800, mb: 1.5 }}>
                Academy General Progress
              </Typography>

              <Stack spacing={2}>
                {[
                  "Backend Engineering",
                  "Dev Ops",
                  "Core Programming",
                  "Full-Stack Engineering",
                  "Frontend Engineering",
                ].map((cat) => (
                  <Box
                    key={cat}
                    sx={{
                      bgcolor: "#1a2332",
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={{ fontWeight: 800 }}>{cat}</Typography>
                      <Typography sx={{ color: C.textDim }}>0%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={0}
                      sx={{ mt: 1, height: 8, bgcolor: "#131a2a" }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
          <Box sx={{ justifyContent: "space-between", display: "flex" }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, mt: 10 }}>
              Modules In Progress
            </Typography>
            <Box sx={{ display: "flex", alignItems: "right" }}>
              <Typography
                sx={{
                  mt: 14,
                  mr: 3,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                View all Modules in Progress
              </Typography>
              {/* <Box
                sx={{
                  bgcolor: "#55555580",
                  p: 0.5,
                  pl: 1,
                  mr: 3,
                  mt: 13,
                  borderRadius: 1,
                  alignContent: "center",
                  height: 27,
                }}
              >
                <ArrowBackIosIcon sx={{ width: 18 }} />
              </Box> */}
              <Box sx={{ display: "flex", gap: 0.1, mt: 12 }}>
                <img src={arrowLeft} width={45} height={45} />
                <img src={arrowRight} width={45} height={45} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "space-between",
              mb: 3,
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                bgcolor: "background.paper",
                borderRadius: 4,
                width: "29%",
                p: 2,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "8%",
                  bgcolor: "#C47CFF",
                  color: "#000",
                  px: 0.7,
                  py: 0.1,
                  borderRadius: 0.7,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 10,
                }}
              >
                In Progress
              </Box>
              <img src={linux} width="100%" />
              <Typography sx={{ fontSize: 15 }}>Regular General</Typography>
              <Typography sx={{ fontSize: 24 }}>Linux</Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      borderRight: 1,
                      borderWidth: 2,
                      pr: 1,
                      borderColor: C.border,
                    }}
                  >
                    Fundamental
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      borderRight: 1,
                      borderWidth: 2,
                      pr: 1,
                      ml: 1,
                      borderColor: C.border,
                    }}
                  >
                    6h
                  </Typography>
                  <Typography sx={{ fontSize: 14, ml: 1 }}>Tier 0</Typography>
                </Box>
                <ArrowForwardIosIcon sx={{ width: 17 }} />
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                width: "29%",
              }}
            >
              <Typography>Linux</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                width: "29%",
              }}
            >
              <Typography>Linux</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                width: "29%",
              }}
            >
              <Typography>Linux</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
