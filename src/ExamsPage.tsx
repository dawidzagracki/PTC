import {
  Box,
  Stack,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
  Grid,
  Divider,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ShieldIcon from "@mui/icons-material/Shield";

// Kolory zgodne z poprzednimi komponentami
const C = {
  bg: "#0A0F1E",
  surface: "#111927",
  cardBg: "#1a2332",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.08)",
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

interface ExamCardProps {
  title: string;
  price: string;
  badgeColor: string;
}

function ExamCard({ title, price, badgeColor }: ExamCardProps) {
  return (
    <Box
      sx={{
        bgcolor: C.cardBg,
        borderRadius: 2,
        p: 4,
        border: `1px solid ${C.border}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, border-color 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(166, 250, 18, 0.3)",
          cursor: "pointer",
        },
      }}
    >
      {/* Placeholder dla Badge'a certyfikatu */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px dashed ${badgeColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: `1px solid ${badgeColor}`,
              opacity: 0.3,
            },
          }}
        >
          <ShieldIcon sx={{ color: badgeColor, fontSize: 40 }} />
        </Box>
      </Box>

      {/* Treść */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 20,
            color: C.text,
            lineHeight: 1.2,
            mb: 1,
            minHeight: "3em",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: C.textDim, fontSize: 13, mb: 3 }}>
          Valid for 2 attempts
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 48,
            color: C.text,
            mb: 3,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {price}
          <Typography component="span" sx={{ fontSize: 20, mt: 1, ml: 0.5 }}>
            *
          </Typography>
        </Typography>
      </Box>

      <Divider sx={{ borderColor: C.border, mb: 3 }} />

      <Typography
        sx={{
          color: C.lime,
          fontWeight: 800,
          fontSize: 14,
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Get Exam Voucher
      </Typography>
    </Box>
  );
}

export default function ExamsPage() {
  const exams = [
    {
      title: "HTB Certified Junior Cybersecurity Associate",
      price: "$105",
      badgeColor: "#C9D3E3",
    },
    {
      title: "HTB Certified Penetration Testing Specialist",
      price: "$210",
      badgeColor: "#b41cb9",
    },
    {
      title: "HTB Certified Web Exploitation Specialist",
      price: "$210",
      badgeColor: "#ff4d4d",
    },
    {
      title: "HTB Certified Defensive Security Analyst",
      price: "$210",
      badgeColor: "#00d1ff",
    },
    {
      title: "HTB Certified Web Exploitation Expert",
      price: "$350",
      badgeColor: "#A6FA12",
    },
    {
      title: "HTB Certified Active Directory Pentesting Expert",
      price: "$350",
      badgeColor: "#ff9f1c",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          pb: 10,
          mt: 5,
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 10 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: C.text }}>
              Exam Vouchers
            </Typography>
            <Box
              sx={{
                bgcolor: "#1b2434",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: `1px solid ${C.border}`,
              }}
            >
              <ConfirmationNumberIcon sx={{ color: C.lime, fontSize: 18 }} />
              <Typography sx={{ fontWeight: 800, color: C.text, fontSize: 14 }}>
                0
              </Typography>
            </Box>
          </Stack>

          {/* Siatka certyfikatów */}
          <Grid container spacing={4}>
            {exams.map((exam, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <ExamCard
                  title={exam.title}
                  price={exam.price}
                  badgeColor={exam.badgeColor}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
