import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import main1 from "./assets/main-1.png";
import main2 from "./assets/main-2.png";
import module1 from "./assets/module-1.png";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";

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

const bgStyles: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(41, 15, 15, 0) 0%, rgba(15,21,41,0.45) 55%, #101927 100%)," +
    "radial-gradient(circle at 20% 20%, rgba(154,248,11,0.08) 0, rgba(15,21,41,0) 35%)," +
    "radial-gradient(circle at 80% 30%, rgba(0,209,255,0.08) 0, rgba(15,21,41,0) 35%)," +
    "radial-gradient(circle at 50% 80%, rgba(154,248,11,0.06) 0, rgba(15,21,41,0) 40%)," +
    "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0 0.5px, transparent 0 2px)",
  backgroundRepeat: "no-repeat",
  filter: "saturate(120%)",
  pointerEvents: "none",
};

export default function MainSite() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        component="main"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{ position: "relative", minHeight: { xs: "58vh", md: "72vh" } }}
        >
          <Box style={bgStyles} />
          <Container
            maxWidth="xl"
            sx={{
              position: "relative",
              zIndex: 1,
              pt: { xs: 10, md: 16 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontSize: "clamp(24px, 6vw, 76px)",
                lineHeight: 1.05,
              }}
            >
              Your programming
              <br />
              journey starts here.
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 920, mx: "auto", mb: 5 }}
            >
              Develop your skills with guided training and prove your expertise
              with industry certifications. Become a market‑ready professional
              programmer.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button size="large" variant="contained" color="primary">
                Start for Free
              </Button>
              <Button
                size="large"
                variant="outlined"
                sx={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                For Business
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="xl" sx={{ pb: 10 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Box
              sx={{
                flex: 1,
                bgcolor: "background.paper",
                borderRadius: 4,
                p: 4,
                pt: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                component="img"
                src={main2}
                sx={{
                  width: 250,
                  position: "absolute",
                  top: -160,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />

              <Typography
                variant="h5"
                sx={{ fontWeight: 800, mb: 1, textAlign: "center", mt: 2 }}
              >
                Get certified with PTC
              </Typography>

              <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                Learn the skills you need to pass industry-recognized
                certifications through hands-on labs and guided modules.
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: "background.paper",
                borderRadius: 4,
                p: 4,
                pt: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                component="img"
                src={main1}
                sx={{
                  width: 250,
                  position: "absolute",
                  top: -160,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />

              <Typography
                variant="h5"
                sx={{ fontWeight: 800, mb: 1, textAlign: "center", mt: 2 }}
              >
                Master new skills
              </Typography>

              <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                Build practical experience across blue, red, and purple team
                paths with progressive learning content.
              </Typography>
            </Box>
          </Stack>
        </Container>
        <Container
          sx={{ justifyContent: "center", display: "flex", pb: 10 }}
          maxWidth="xl"
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "background.paper",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: 800, fontSize: 38 }}
            >
              Why Path The Code
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", pt: 3, width: "60%", mx: "auto" }}
            >
              Prepare for your future in IT with interactive, guided training
              and industry certifications. Learn the skills needed to stand out
              from the competition.
            </Typography>
            <Container
              sx={{ display: "flex", flexDirection: "row", gap: 1, pt: 4 }}
            >
              <Container>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    Guided Courses
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    For every skill level, from begginer to advanced.
                  </Typography>
                </Box>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    In-browser Coding
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    Tackle all lab exercises from your browser.
                  </Typography>
                </Box>
              </Container>
              <Container>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    Highly Practical
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    Practice in a real-world environemtnt.
                  </Typography>
                </Box>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    Get Certified
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    Stand out in the job market, skyrocket your resume.
                  </Typography>
                </Box>
              </Container>
              <Container>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    Unlimited & Online
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    On-demand access from everywhere, at any time.
                  </Typography>
                </Box>
                <Box
                  maxWidth="100%"
                  sx={{
                    flex: 1,
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", fontWeight: 700, fontSize: 22 }}
                  >
                    Job & Skill Paths
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                  >
                    Achieve job profieciency with structured learning paths.
                  </Typography>
                </Box>
              </Container>
            </Container>
          </Box>
        </Container>
        <Container
          sx={{ justifyContent: "center", display: "flex", pb: 4 }}
          maxWidth="xl"
        >
          <Box
            maxWidth="sm"
            sx={{
              flex: 1,
              bgcolor: "background.paper",
              borderRadius: 4,
              p: 2,
              paddingX: 0,
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Container sx={{ display: "flex", gap: 1 }}>
              <Box
                maxWidth="50%"
                sx={{
                  flex: 1,
                  bgcolor: "#9AF80B",
                  borderRadius: 4,
                  p: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "black", fontWeight: 700 }}
                >
                  JOB ROLE PATHS
                </Typography>
              </Box>
              <Box
                maxWidth="50%"
                sx={{
                  flex: 1,
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  p: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  SKILL PATHS
                </Typography>
              </Box>
            </Container>
          </Box>
        </Container>
        <Typography
          sx={{ textAlign: "center", fontSize: 44, fontWeight: 800, mb: 4 }}
        >
          Master a skill
        </Typography>
        <Container
          sx={{ display: "flex", gap: 4, mb: 10, justifyContent: "center" }}
          maxWidth="xl"
        >
          <Card
            sx={{
              maxWidth: "37%",
              backgroundColor: "#1a23321e",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              borderRadius: 4,
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="270"
              src={module1}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Basic Toolset
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                In this path, modules cover the basic tools needed to be
                successful in network and web application penetration testing...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Easy</Button>
              <Button size="small">3 Modules</Button>
              <Button size="small">35 Sections</Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              maxWidth: "37%",
              backgroundColor: "#1a23321e",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              borderRadius: 4,
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="270"
              src={module1}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Basic Toolset
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                In this path, modules cover the basic tools needed to be
                successful in network and web application penetration testing...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Easy</Button>
              <Button size="small">3 Modules</Button>
              <Button size="small">35 Sections</Button>
            </CardActions>
          </Card>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: "29%",
              height: "30%",
              borderColor: "#414750b9",
              borderWidth: 0.1,
              borderStyle: "solid",
              borderRadius: 2,
              paddingX: 5,
              paddingY: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              15+ paths
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              To obtain hands-on experience
            </Typography>
          </Box>
          <Box
            sx={{
              width: "29%",
              height: "30%",
              borderColor: "#414750b9",
              borderWidth: 0.1,
              borderStyle: "solid",
              borderRadius: 2,
              paddingX: 5,
              paddingY: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              145+ modules
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              To obtain hands-on experience
            </Typography>
          </Box>
          <Box
            sx={{
              width: "29%",
              height: "30%",
              borderColor: "#414750b9",
              borderWidth: 0.1,
              borderStyle: "solid",
              borderRadius: 2,
              display: "flex",
              paddingX: 5,
              paddingY: 4,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              1200+ labs
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              To obtain hands-on experience
            </Typography>
          </Box>
        </Container>
        <Container
          sx={{ display: "flex", justifyContent: "center", mb: 10, mt: 7 }}
          maxWidth="xl"
        >
          <Box
            sx={{
              width: "90%",
              backgroundColor: "background.paper",
              py: 6,
              borderRadius: 4,
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontSize: 52, fontWeight: 800, mb: 2 }}
            >
              Learn programming,
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 52,
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                invest in your
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 52,
                  fontWeight: 800,
                  mb: 2,
                  color: "#9AF80B",
                }}
              >
                skills
              </Typography>
            </Container>
            <Stack direction="row" spacing={1.5} justifyContent="center" mt={4}>
              <Button
                color="inherit"
                variant="text"
                sx={{
                  borderColor: "rgba(255, 255, 255, 1)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  width: 120,
                }}
              >
                Sign In
              </Button>
              <Button variant="contained" color="primary">
                Start for Free
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          color: "text.secondary",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} — BakeSoft Company. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
