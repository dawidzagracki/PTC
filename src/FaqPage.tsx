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

const faqItems = [
  {
    title: "What is PathTheCode?",
    description:
      "PathTheCode is a learning platform designed to help you become a real-world developer through structured learning paths, interactive modules, and hands-on coding challenges directly in your browser.",
  },
  {
    title: "How is PathTheCode different from other coding platforms?",
    description: `PathTheCode combines interactive coding tasks, real project simulations, and job-oriented skill paths.
      Instead of random tutorials, you follow a guided program designed to build industry-ready skills.`,
  },
  {
    title: "I am new to programming. Is PathTheCode a good place to start?",
    description: `Absolutely.
        PathTheCode includes Fundamental modules that teach core programming concepts step by step.
        Even complete beginners can start learning from scratch and build up to advanced topics like backend development, frontend frameworks, or cloud engineering.`,
  },
  {
    title: "Is PathTheCode free?",
    description: `PathTheCode offers a free tier with access to selected modules.
      Full access to advanced modules, job role paths, and interactive environments requires a premium plan.`,
  },
  {
    title: "How do I sign in to PathTheCode?",
    description: `You can sign in using a standard email and password or through OAuth providers (Google, GitHub — depending on your setup).
          No hacking required — security is handled for you. 😉`,
  },
  {
    title: "Can I use my PathTheCode account across different devices?",
    description: `Yes.
        Your progress, achievements, and completed modules sync automatically across all devices.
        You can continue learning anywhere.`,
  },
  {
    title: "Do I need a strong computer to run coding environments?",
    description: `No.
      PathTheCode uses browser-based interactive environments, so exercises run on our servers.
      Your device only needs to support a modern browser — nothing more.`,
  },
  {
    title: "What are Skill Paths and Job Role Paths?",
    description:
      "Skill Paths focus on specific technologies (e.g., React Fundamentals, .NET Backend Essentials). Job Role Paths prepare you for full positions (e.g., Full Stack Developer, Cloud Engineer). Each path contains multiple modules, projects, and assessments that guide you from zero to job-ready.",
  },
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
                  <Typography sx={{ fontWeight: 500 }}>
                    {question.title}
                  </Typography>
                </AccordionSummary>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                <AccordionDetails sx={{ px: 3, py: 2.5 }}>
                  <Typography color="text.secondary">
                    {question.description}
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
