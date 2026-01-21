import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import VerifiedIcon from "@mui/icons-material/Verified";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import { useParams } from "react-router-dom";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import {
  getCertificateDetailsById,
  getCertificatePublicDetailsById,
  type CertificateDetailsDto,
  type CertificatePublicDetailsDto,
} from "./Services/CertificatesService";

const C = {
  bg: "#101927",
  surface: "#1a2332",
  surface2: "#0F1529",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
  border2: "rgba(255,255,255,0.08)",
  tabBg: "rgba(255,255,255,0.06)",
  tabBgActive: "rgba(255,255,255,0.10)",
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

type TabKey = "overview" | "history" | "validation";

export default function CertificateOverviewPage() {
  const { isMain, id } = useParams();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<TabKey>("overview");

  const [certInfo, setCertInfo] = useState<CertificatePublicDetailsDto>();
  const [certPrivateInfo, setPrivateCertInfo] =
    useState<CertificateDetailsDto>();

  useEffect(() => {
    if (isMain == "false") {
      fetchCertificates();
      setIsPrivate(false);
    }
    if (isMain == "true") {
      fetchPrivateCertificates();
      setIsPrivate(true);
    }
  }, []);

  async function fetchCertificates() {
    await getCertificatePublicDetailsById(id ?? "").then((certs) => {
      console.log(certs);
      setCertInfo(certs);
    });
  }

  async function fetchPrivateCertificates() {
    await getCertificateDetailsById(id ?? "").then((certs) => {
      setPrivateCertInfo(certs);
    });
  }
  const activeTabSx = {
    bgcolor: C.tabBgActive,
    border: `1px solid ${C.border2}`,
    color: C.text,
  } as const;

  const inactiveTabSx = {
    bgcolor: "transparent",
    border: `1px solid transparent`,
    color: "rgba(230,241,255,0.78)",
    "&:hover": { bgcolor: C.tabBg },
  } as const;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isMain == "true" ? <SubNavMenu /> : <MainNavMenu />}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pt: 6,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          {/* TOP HERO */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "start",
            }}
          >
            {/* LEFT */}
            <Box>
              <Chip
                label="Job Role Pending"
                size="small"
                sx={{
                  height: 22,
                  borderRadius: 1,
                  fontWeight: 800,
                  bgcolor: "rgba(255,196,0,0.15)",
                  color: "#FFC400",
                  border: "1px solid rgba(255,196,0,0.20)",
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: 0.2,
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  mb: 3,
                }}
              >
                {isPrivate ? certPrivateInfo?.name : certInfo?.name}
              </Typography>

              <Button
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: C.lime,
                  color: "#101927",
                  px: 3,
                  py: 1.2,
                  borderRadius: 1.5,
                  fontWeight: 900,
                  "&:hover": { bgcolor: "#b7ff2a" },
                }}
              >
                Get Voucher
              </Button>
            </Box>

            {/* RIGHT (image placeholder) */}
            <Box
              sx={{
                width: "100%",
                height: { xs: 220, md: 260 },
                borderRadius: 2,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, rgba(166,250,18,0.15) 0%, rgba(0,209,255,0.08) 45%, rgba(255,0,128,0.10) 100%)," +
                  "radial-gradient(circle at 20% 25%, rgba(166,250,18,0.18) 0%, rgba(16,25,39,0) 55%)," +
                  "radial-gradient(circle at 80% 35%, rgba(0,209,255,0.12) 0%, rgba(16,25,39,0) 60%)," +
                  "linear-gradient(180deg, rgba(15,21,41,0.2) 0%, rgba(16,25,39,1) 100%)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 10px)",
                  opacity: 0.12,
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 18,
                  top: 18,
                  px: 1.4,
                  py: 0.6,
                  borderRadius: 1.2,
                  border: "1px solid rgba(255,255,255,0.10)",
                  bgcolor: "rgba(0,0,0,0.25)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 2,
                    fontSize: 12,
                    opacity: 0.9,
                  }}
                >
                  CJCA
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* TABS + DIVIDER */}
          <Box sx={{ mt: 6 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Button
                onClick={() => setTab("overview")}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1.5,
                  fontWeight: 900,
                  ...(tab === "overview" ? activeTabSx : inactiveTabSx),
                }}
              >
                Overview
              </Button>
              <Button
                onClick={() => setTab("history")}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1.5,
                  fontWeight: 800,
                  ...(tab === "history" ? activeTabSx : inactiveTabSx),
                }}
              >
                History
              </Button>
              <Button
                onClick={() => setTab("validation")}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1.5,
                  fontWeight: 800,
                  ...(tab === "validation" ? activeTabSx : inactiveTabSx),
                }}
              >
                Certificate Validation
              </Button>
            </Stack>

            <Divider sx={{ borderColor: C.border, mt: 2.5 }} />
          </Box>

          {/* CONTENT */}
          <Box sx={{ mt: 4 }}>
            {tab === "overview" && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.7fr" },
                  gap: { xs: 3, md: 5 },
                  alignItems: "start",
                }}
              >
                {/* LEFT TEXT */}
                <Box sx={{ pr: { xs: 0, md: 1 } }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: C.textDim,
                      lineHeight: 1.9,
                      fontSize: 14.5,
                      maxWidth: 760,
                    }}
                  >
                    {isPrivate
                      ? certPrivateInfo?.overview
                      : certInfo?.description}
                  </Typography>
                </Box>

                {/* RIGHT INFO CARD */}
                <Box
                  sx={{
                    bgcolor: C.surface2,
                    border: `1px solid ${C.border}`,
                    borderRadius: 2,
                    p: 3,
                    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center", mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(255,255,255,0.06)",
                        border: `1px solid ${C.border2}`,
                      }}
                    >
                      <WorkspacePremiumIcon
                        sx={{ fontSize: 18, color: "rgba(230,241,255,0.85)" }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          letterSpacing: 1.4,
                          fontWeight: 900,
                          color: "rgba(153,163,179,0.95)",
                        }}
                      >
                        HTB CERTIFIED
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 900, mt: 0.5, lineHeight: 1.2 }}
                      >
                        {isPrivate ? certPrivateInfo?.name : certInfo?.name}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ borderColor: C.border, mb: 2 }} />

                  <Stack spacing={1.4}>
                    {isPrivate ?? (
                      <InfoRow
                        icon={<AccessTimeIcon />}
                        label="Time"
                        value={"5"}
                      />
                    )}

                    <InfoRow
                      icon={<FormatListBulletedIcon />}
                      label="Format"
                      value="Online"
                    />
                    <InfoRow
                      icon={<LanguageIcon />}
                      label="Language"
                      value="English / Polish"
                    />
                    <InfoRow
                      icon={<VerifiedIcon />}
                      label="Requirement"
                      value={
                        isPrivate
                          ? certPrivateInfo?.pathName ?? ""
                          : certInfo?.pathName ?? ""
                      }
                    />
                    <InfoRow
                      icon={<WorkspacePremiumIcon />}
                      label="Price"
                      value="1 Voucher"
                      valueSx={{ color: C.text, fontWeight: 900 }}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {tab === "history" && (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: C.textDim, fontSize: 14 }}>
                  No history available yet.
                </Typography>
              </Box>
            )}

            {tab === "validation" && (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: C.textDim, fontSize: 14 }}>
                  Certificate validation will be available here.
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueSx,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueSx?: Record<string, unknown>;
}) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        sx={{ width: 22, display: "grid", placeItems: "center", opacity: 0.85 }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          color: "rgba(230,241,255,0.85)",
          fontWeight: 700,
          width: 110,
          fontSize: 13,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: "rgba(153,163,179,0.95)",
          fontWeight: 700,
          fontSize: 13,
          ...valueSx,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
