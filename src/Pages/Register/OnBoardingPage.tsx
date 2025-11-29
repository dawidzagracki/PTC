import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#101927",
      paper: "#161f30",
    },
    primary: { main: "#A6FA12" },
    text: {
      primary: "#E6F1FF",
      secondary: "#99A3B3",
    },
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
    button: { textTransform: "none", fontWeight: 600, fontSize: 14 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const OPTIONS = [
  "Start learning cybersecurity",
  "Train and improve my cybersecurity skills",
  "Earn industry-recognized certifications",
  "Connect with other cyber professionals and enthusiasts",
  "Explore job opportunities in cybersecurity",
  "Challenge myself in cyber competitions",
  "I am looking for team training solutions",
  "Something else",
];

export default function OnBoardingPage() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* LEWA KOLUMNA */}
            <Grid columns={{ xs: 12, md: 7 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 1, letterSpacing: 0.4 }}
              >
                Why have you joined Hack The Box?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Select one or more options
              </Typography>

              <Stack spacing={1.2}>
                {OPTIONS.map((label) => {
                  const checked = selected.includes(label);
                  return (
                    <Paper
                      key={label}
                      onClick={() => toggleOption(label)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        px: 2.5,
                        py: 1.75,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid",
                        borderColor: checked
                          ? "primary.main"
                          : "rgba(255,255,255,0.06)",
                        bgcolor: "#141d2f",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "#182337",
                        },
                      }}
                      elevation={0}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        {label}
                      </Typography>
                      <Checkbox
                        checked={checked}
                        tabIndex={-1}
                        disableRipple
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          "&.Mui-checked": {
                            color: "primary.main",
                          },
                          p: 0,
                        }}
                      />
                    </Paper>
                  );
                })}
              </Stack>
            </Grid>

            {/* PRAWA KOLUMNA */}
            <Grid columns={{ xs: 12, md: 5 }}>
              <Stack spacing={2.5}>
                {/* GÓRNY BOX – Unlock module */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 1,
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "#151f31",
                    p: 2.5,
                  }}
                >
                  {/* mała „ikona” zamiast grafiki */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: "#1f2a3f",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                      fontSize: 11,
                      mb: 0.75,
                    }}
                  >
                    Unlock an Academy module!
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 13, mb: 2 }}
                  >
                    Unlock up to three free cybersecurity courses on our Academy
                    platform, helping you start your cybersecurity journey.
                  </Typography>

                  <Box
                    sx={{
                      mt: 1,
                      borderRadius: 999,
                      bgcolor: "#111826",
                      px: 1.5,
                      py: 0.75,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={20}
                        sx={{
                          height: 4,
                          borderRadius: 999,
                          bgcolor: "rgba(255,255,255,0.08)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: 11, fontWeight: 500 }}
                    >
                      1 / 5 steps completed
                    </Typography>
                  </Box>
                </Paper>

                {/* DOLNY BOX – opinia */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 1,
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "#151f31",
                    p: 2.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 13,
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    HTB sped up my skills acquisition by connecting theoretical
                    knowledge with hands-on practical machines that tested me.
                  </Typography>
                  <Divider
                    sx={{ mb: 1.5, borderColor: "rgba(255,255,255,0.08)" }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 13, fontWeight: 600 }}
                  >
                    Josiah Beverton
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: 11 }}
                  >
                    Red Team Consultant
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>

          {/* DOLNY PASEK PRZYCISKÓW */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: "text.secondary",
                fontSize: 13,
                px: 0,
                "&:hover": { bgcolor: "transparent", color: "#ffffff" },
              }}
            >
              Skip onboarding
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#233048",
                color: "#ffffff",
                px: 3.5,
                py: 0.75,
                "&:hover": { bgcolor: "#2b3a54" },
              }}
            >
              Continue
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
