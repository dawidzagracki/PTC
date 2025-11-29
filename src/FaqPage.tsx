import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const faqItems: string[] = [
  "What is HTB Academy?",
  "What is the difference between Hack The Box and HTB Academy?",
  "I do not know anything about cybersecurity? Is HTB Academy a good place to start?",
  "Is HTB Academy Free?",
  "How do I sign in? Do I need to hack my login here too?",
  "Can I login to Academy with my Hack The Box main platform email and password?",
  "Can I use the same username and password as Hack The Box main platform account?",
];

const FaqPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<number | false>(0);
  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          pt: 6,
          pb: 3,
          mb: 10,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 6,
            fontSize: { xs: "2rem", md: "3.25rem" },
          }}
        >
          Frequently Asked Questions
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          {/* Lista FAQ */}
          <Box sx={{ maxWidth: "100%", mx: "auto" }}>
            {faqItems.map((question, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255,255,255,0.06)",
                  mb: 1.5,
                  borderRadius: 1,
                  "&:before": { display: "none" }, // usuwa domyślną linię MUI
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#99A3B3" }} />}
                  sx={{ px: 3, py: 2 }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{question}</Typography>
                </AccordionSummary>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                <AccordionDetails sx={{ px: 3, py: 2.5 }}>
                  <Typography color="text.secondary">
                    Placeholder answer text (treść nie jest kopiowana z HTB,
                    tylko zachowany jest układ i kolorystyka).
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FaqPage;
