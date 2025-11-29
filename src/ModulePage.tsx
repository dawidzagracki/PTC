import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Toolbar,
  AppBar,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import logo from "./assets/logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const navItems = ["Dashboard", "Library", "Resources"];

theme = responsiveFontSizes(theme);

export default function ModulePage() {
  // fake data for right-hand TOC
  const toc = [
    {
      num: 1,
      title: "Introduction",
      sections: [
        {
          type: "Article",
          title: "Linux Structure",
          active: true,
          state: "In progress",
        },
        { type: "Article", title: "Linux Distributions" },
        { type: "Article", title: "Introduction to Shell" },
      ],
    },
    { num: 2, title: "The Shell", sectionsCount: 3 },
    { num: 3, title: "Workflow", sectionsCount: 8 },
    { num: 4, title: "System Management", sectionsCount: 9 },
    { num: 5, title: "Linux Networking", sectionsCount: 2 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
            minHeight: 72,
          }}
        >
          <Box sx={{ width: 2, mr: 0 }} />
          <Box sx={{ mr: 4 }}>
            <img src={logo} width={90} />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((label) => (
              <Button
                key={label}
                color="inherit"
                variant="text"
                size="small"
                sx={{ opacity: 0.9 }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1.5}>
            <Button variant="contained" color="primary">
              Upgrade
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
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
            height: 56,
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
            <IconButton size="small" sx={{ color: "#E6F1FF", opacity: 0.8 }}>
              {/* placeholder for back chevron */}
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderLeft: "2px solid #E6F1FF",
                  borderBottom: "2px solid #E6F1FF",
                  transform: "rotate(45deg)",
                }}
              />
            </IconButton>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  bgcolor: "#9AF80B",
                  borderRadius: "4px",
                  opacity: 0.9,
                }}
              />
              <Typography sx={{ fontWeight: 700 }}>
                Linux Fundamentals
              </Typography>
              <Typography sx={{ opacity: 0.6, fontSize: 14 }}>0%</Typography>
              <Box
                sx={{
                  width: 120,
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
                    width: "0%",
                    bgcolor: "#9AF80B",
                    borderRadius: 999,
                  }}
                />
              </Box>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />
            {/* tiny help icons placeholders */}
            <Stack direction="row" spacing={2} sx={{ opacity: 0.8 }}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: 1,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              />
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: 1,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              />
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: 1,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              />
            </Stack>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ pt: 3, pb: 16 }}>
          <Stack direction="row" spacing={4} alignItems="flex-start">
            {/* LEFT – article content */}
            <Box sx={{ flex: 1, maxWidth: 920 }}>
              <Typography sx={{ opacity: 0.7, fontSize: 13, mb: 1 }}>
                Section <b>1</b> / 30
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5 }}>
                Linux Structure
              </Typography>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

              <Typography sx={{ lineHeight: 1.8, color: "#C9D7F0" }}>
                Linux, as you might already know, is an operating system used
                for personal computers, servers, and even mobile devices.
                However, Linux stands as a fundamental pillar in cybersecurity,
                renowned for its robustness, flexibility, and open-source
                nature. In this section we are going to cover the Linux
                structure, history, philosophy, architecture, and file system
                hierarchy—essential knowledge for any cybersecurity
                professional. You can think of this as your first driving lesson
                for a new car, getting a basic understanding of the vehicle,
                what it consists of, and why it is the way it currently is.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 800, mt: 4, mb: 1 }}>
                History
              </Typography>
              <Typography sx={{ lineHeight: 1.8, color: "#C9D7F0" }}>
                Many events led up to creating the first Linux kernel and,
                ultimately, the Linux operating system (OS), starting with the
                Unix operating system’s release by Ken Thompson and Dennis
                Ritchie in the 1970s…
              </Typography>
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
                {toc.map((group, gi) => (
                  <Box key={gi} sx={{}}>
                    <ListItem sx={{ px: 2, py: 0.8 }}>
                      <Box
                        key={gi}
                        sx={{
                          bgcolor: "background.paper",
                          borderRadius: 2,
                          p: 2,
                          width: "100%",
                          border: "1px solid rgba(255,255,255,0.05)",
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
                              {gi + 1}
                            </Box>

                            <Typography sx={{ fontWeight: 700 }}>
                              {group.title}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <Typography sx={{ opacity: 0.7 }}>
                              {4} Sections
                            </Typography>
                            <KeyboardArrowDownIcon sx={{ opacity: 0.7 }} />
                          </Stack>
                        </Stack>
                      </Box>
                    </ListItem>

                    {/* nested */}
                    {/* {group.sections && (
                      <Box sx={{ px: 2 }}>
                        {group.sections.map((s, si) => (
                          <ListItemButton
                            key={si}
                            sx={{
                              mb: 1,
                              borderRadius: 1.5,
                              bgcolor: s.active
                                ? "rgba(166,250,18,0.06)"
                                : "transparent",
                              border: s.active
                                ? "1px solid rgba(166,250,18,0.35)"
                                : "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <ListItemText
                              primary={
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  <Typography
                                    sx={{ fontSize: 12, opacity: 0.7 }}
                                  >
                                    {s.type}
                                  </Typography>
                                  <Typography sx={{ fontWeight: 700 }}>
                                    {s.title}
                                  </Typography>
                                  <Box sx={{ flexGrow: 1 }} />
                                  {s.state && (
                                    <Typography
                                      sx={{
                                        fontSize: 12,
                                        color: "#A6FA12",
                                        fontWeight: 800,
                                      }}
                                    >
                                      {s.state}
                                    </Typography>
                                  )}
                                </Stack>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </Box>
                    )} */}
                  </Box>
                ))}
              </List>
            </Box>
          </Stack>
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
          <Container maxWidth="xl" sx={{ mr: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent={"right"}
              marginRight={0}
              paddingRight={1}
            >
              <Box
                sx={{
                  ml: "auto",
                  mr: 0,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "rgba(255,255,255,0.06)",
                  borderRadius: 999,
                  fontSize: 13,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: "#A6FA12",
                    borderRadius: "50%",
                  }}
                />
                +10
              </Box>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "#E6F1FF",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                }}
              >
                Next
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#A6FA12",
                  color: "#0A0F1E",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "#9BE40F" },
                }}
              >
                Mark Complete & Next
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
