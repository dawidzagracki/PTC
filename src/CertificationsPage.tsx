import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";
import { useEffect, useState } from "react";
import {
  getCertificates,
  type CertificateListItemDto,
} from "./Services/CertificatesService";
import { useNavigate } from "react-router-dom";

const COLORS = {
  pageBg: "#0A0F1E",
  cardBg: "#101927",
  text: "#E6F1FF",
  textMuted: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
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

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<CertificateListItemDto[]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    await getCertificates().then((certs) => {
      setCertificates(certs);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          bgcolor: "background.default",
          color: COLORS.text,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            pt: 5,
            pb: 3,
            mb: 10,
          }}
        >
          <Typography
            align="center"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.4rem", md: "3.75rem" },
            }}
          >
            HTB Certifications
          </Typography>

          <Typography
            align="center"
            sx={{
              color: COLORS.textMuted,
              maxWidth: 1100,
              mx: "auto",
              mb: { xs: 6, md: 8 },
              fontSize: { xs: 14, md: 16 },
            }}
          >
            HTB Academy’s certifications focus on practical skills needed for
            real cybersecurity roles. Dzięki aktualnym materiałom, wymagającym
            środowiskom labowym i jasno określonym ścieżkom, uczestnicy
            zdobywają solidne, techniczne kompetencje w różnych domenach
            bezpieczeństwa.
          </Typography>
        </Box>

        <Container maxWidth="xl">
          {/* Main certification card */}
          {certificates?.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                bgcolor: "background.paper",
                borderRadius: 3,
                border: `1px solid ${COLORS.border}`,
                overflow: "hidden",
              }}
              key={index}
            >
              <Box
                sx={{
                  flexBasis: { md: "42%" },
                  minHeight: 340,
                  background:
                    "radial-gradient(circle at 20% 20%, #ff5b5b 0, transparent 55%)," +
                    "radial-gradient(circle at 80% 80%, #377DFF 0, transparent 55%)," +
                    "linear-gradient(135deg, #1b2740 0%, #111827 60%, #1b2740 100%)",
                }}
              />
              {/* RIGHT: opis certyfikatu */}
              <Box
                sx={{
                  flex: 1,
                  px: { xs: 3, md: 5 },
                  py: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Overline */}
                <Typography
                  sx={{
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: COLORS.textMuted,
                    fontSize: 13,
                    mb: 2,
                  }}
                >
                  PTC Certified
                </Typography>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.9rem", md: "2.4rem" },
                    lineHeight: 1.1,
                    mb: 3,
                  }}
                >
                  {item.name}
                </Typography>

                {/* Body text */}
                <Typography
                  sx={{
                    color: COLORS.textMuted,
                    fontSize: { xs: 14, md: 15 },
                    maxWidth: 900,
                    mb: 4,
                  }}
                >
                  {item.description}
                </Typography>

                {/* Bottom info row */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 3, md: 4 }}
                  sx={{
                    borderTop: `1px solid ${COLORS.border}`,
                    pt: 3,
                    mt: "auto",
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                >
                  {/* Col 1 */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ color: COLORS.textMuted, fontSize: 12, mb: 0.5 }}
                    >
                      Related Job Role Path
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {item.pathName}
                    </Typography>
                  </Box>

                  {/* Col 2 */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ color: COLORS.textMuted, fontSize: 12, mb: 0.5 }}
                    >
                      Covers
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {item.modulesCount} Modules
                    </Typography>
                  </Box>

                  {/* Col 3 */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ color: COLORS.textMuted, fontSize: 12, mb: 0.5 }}
                    >
                      Exam Vouchers Required
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      1 Voucher
                    </Typography>
                  </Box>

                  {/* Col 4 – price + button */}
                  <Stack
                    direction={{ xs: "row", md: "column" }}
                    spacing={1.5}
                    sx={{ alignItems: { xs: "center", md: "flex-end" } }}
                  >
                    <Box>
                      <Typography
                        sx={{ color: COLORS.textMuted, fontSize: 12, mb: 0.5 }}
                      >
                        Get certified for
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: 32,
                          lineHeight: 1,
                        }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: COLORS.lime,
                        color: "#101927",
                        fontWeight: 800,
                        px: 3,
                        "&:hover": { bgcolor: "#b8ff32" },
                      }}
                      onClick={() => navigate(`/certificate/false/${item.id}`)}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
