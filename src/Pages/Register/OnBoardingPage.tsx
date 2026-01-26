import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { completeOnboarding, skipOnboarding } from "../../Services/OnboardingService";
import type { OnboardingRequest } from "../../Models/OnboardingRequest";

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

type StepKey =
  | "experienceLevels"
  | "learningGoals"
  | "availability"
  | "techInterests"
  | "dreamProjects";

const STEPS: {
  key: StepKey;
  question: string;
  options: string[];
}[] = [
  {
    key: "experienceLevels",
    question:
      "Jak wygląda Twoja dotychczasowa styczność z kodem i IT? (Max 3)",
    options: [
      "Zero absolutne: Nigdy nie widziałem/am kodu.",
      "Excel Master: Nie programuję, ale świetnie radzę sobie z Excelem.",
      "Edytor CMS: Wordpress/Wix bez kodowania.",
      "HTML/CSS: Edytowałem/am wygląd strony.",
      "Tutorial Hell: Robię kursy, ale nie umiem pisać sam/a.",
      "Studia/Szkoła: Miałem/am programowanie w edukacji.",
      "Skrypty/Automatyzacja: Pisałem/am proste skrypty.",
      "Inna branża IT: Pracuję w IT (PM, HR), ale nietechnicznie.",
    ],
  },
  {
    key: "learningGoals",
    question: "Co jest Twoim głównym celem? (Max 3)",
    options: [
      "Pierwsza praca: Junior Developer na etacie.",
      "Freelancing: Dorabianie po godzinach.",
      "Własny Startup: Budowa MVP.",
      "Przebranżowienie wewnętrzne: Awans w obecnej firmie.",
      "Automatyzacja: Automatyzacja nudnej pracy.",
      "Hobby i rozwój: Trening logicznego myślenia.",
      "Dla dzieci/rodziny: Nauka dla bliskich.",
      "Przyszłość / AI: Nauka sterowania AI.",
    ],
  },
  {
    key: "availability",
    question: "Ile czasu tygodniowo realnie poświęcisz na naukę? (Max 3)",
    options: [
      "Mikro-nauka: Do 2h.",
      "Weekendowy wojownik: 3-5h.",
      "Spokojne tempo: 5-8h.",
      "Solidna nauka: 8-12h.",
      "Pół etatu: 15-20h.",
      "Tryb Bootcamp: 20-30h.",
      "Full Time: 40+h.",
      "Nieregularnie: Nauka zrywami.",
    ],
  },
  {
    key: "techInterests",
    question: "Jaka dziedzina IT interesuje Cię najbardziej? (Max 3)",
    options: [
      "Frontend: Wygląd i interakcje.",
      "Backend: Logika i serwery.",
      "Fullstack: Frontend + Backend.",
      "Aplikacje Mobilne: iOS/Android.",
      "Game Dev: Gry.",
      "Data Science / AI: Analiza danych i AI.",
      "QA / Testowanie: Testowanie oprogramowania.",
      "Nie mam pojęcia: Doradźcie mi.",
    ],
  },
  {
    key: "dreamProjects",
    question: "Co stworzyłbyś/ałabyś jako pierwsze? (Max 3)",
    options: [
      "Własna strona wizytówka.",
      "Sklep internetowy.",
      "Prosta gra.",
      "Aplikacja \"To-Do\".",
      "Bot / Automat.",
      "Klon znanej apki (Instagram/Uber).",
      "Narzędzie finansowe.",
      "Nic konkretnego (zagadki logiczne).",
    ],
  },
];

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selections, setSelections] = React.useState<
    Record<StepKey, string[]>
  >({
    experienceLevels: [],
    learningGoals: [],
    availability: [],
    techInterests: [],
    dreamProjects: [],
  });

  const currentStep = STEPS[stepIndex];
  const selected = selections[currentStep.key];
  const selectedCount = selected.length;
  const isMaxSelected = selectedCount >= 3;
  const progressValue = ((stepIndex + 1) / STEPS.length) * 100;

  const toggleOption = (key: StepKey, label: string) => {
    setSelections((prev) => {
      const current = prev[key];
      const isSelected = current.includes(label);

      if (isSelected) {
        return { ...prev, [key]: current.filter((x) => x !== label) };
      }

      if (current.length >= 3) {
        return prev;
      }

      return { ...prev, [key]: [...current, label] };
    });
  };

  const handleContinue = async () => {
    setError(null);

    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    const payload: OnboardingRequest = {
      experienceLevels: selections.experienceLevels,
      learningGoals: selections.learningGoals,
      availability: selections.availability,
      techInterests: selections.techInterests,
      dreamProjects: selections.dreamProjects,
    };

    try {
      setIsSubmitting(true);
      await completeOnboarding(payload);
      localStorage.setItem("isOnBoarded", "true");
      navigate("/dashboard");
    } catch {
      setError("Nie udało się zapisać onboardingu. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setError(null);

    try {
      setIsSubmitting(true);
      await skipOnboarding();
      localStorage.setItem("isOnBoarded", "true");
      navigate("/dashboard");
    } catch {
      setError("Nie udało się pominąć onboardingu. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
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
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "lg" }}>
          {/* ZAMIANA GRID NA BOX Z FLEXBOXEM */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Na mobile pionowo, na md poziomo
              gap: 4, // Odpowiednik spacing={4} w Grid
              alignItems: "flex-start",
            }}
          >
            {/* LEWA KOLUMNA - SZERSZA (flex: 2) */}
            <Box sx={{ flex: 2, width: "100%", mr: { md: 3 } }}>
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 1, letterSpacing: 0.4 }}
              >
                {currentStep.question}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Wybierz maksymalnie 3 opcje
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wybrano: {selectedCount}/3
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {currentStep.options.map((label) => {
                  const checked = selected.includes(label);
                  const isDisabled = !checked && isMaxSelected;
                  return (
                    <Paper
                      key={label}
                      onClick={() =>
                        isDisabled ? undefined : toggleOption(currentStep.key, label)
                      }
                      sx={{
                        cursor: isDisabled ? "not-allowed" : "pointer",
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
                        opacity: isDisabled ? 0.6 : 1,
                        "&:hover": {
                          borderColor: isDisabled ? "rgba(255,255,255,0.06)" : "primary.main",
                          bgcolor: isDisabled ? "#141d2f" : "#182337",
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
              <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="text"
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                    px: 0,
                    "&:hover": { bgcolor: "transparent", color: "#ffffff" },
                    mr: 4,
                  }}
                  onClick={handleSkip}
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
                  disabled={selectedCount === 0 || isSubmitting}
                  onClick={handleContinue}
                >
                  {stepIndex < STEPS.length - 1
                    ? "Continue"
                    : isSubmitting
                      ? "Saving..."
                      : "Finish"}
                </Button>
              </Box>
            </Box>

            {/* PRAWA KOLUMNA - WĘŻSZA (flex: 1) */}
            <Box sx={{ flex: 1, width: "100%", minWidth: { md: "320px" } }}>
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
                        value={progressValue}
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
                      {stepIndex + 1} / {STEPS.length} steps completed
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
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
