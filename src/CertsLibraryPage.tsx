import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  getCertificatesWithUserProgress,
  type CertificateListItemWithUserProgressDto,
} from "./Services/CertificatesService";
import { useNavigate } from "react-router-dom";
import default_module from "./assets/default_module.png";

const C = {
  bg: "#0F1726",
  topFade: "#0F1726",
  paper: "#151F2E",
  paper2: "#121B2A",
  border: "rgba(255,255,255,0.07)",
  border2: "rgba(255,255,255,0.10)",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
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

const certImages = import.meta.glob(
  ["./assets/certifications/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" }
) as Record<string, string>;

const certImageMap = Object.fromEntries(
  Object.entries(certImages).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const slug = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
    return [slug, url];
  })
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const getCertImage = (name: string) =>
  certImageMap[slugify(name)] ?? default_module;

export default function CertsLibraryPage() {
  const navigate = useNavigate();
  const [certsPrivateInfo, setPrivateCertsInfo] =
    useState<CertificateListItemWithUserProgressDto[]>();

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    await getCertificatesWithUserProgress().then((certs) => {
      console.log(certs);
      setPrivateCertsInfo(certs);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pt: 9,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          {/* HEADER */}
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "clamp(34px, 4.2vw, 56px)",
              letterSpacing: 0.2,
              mb: 1.5,
            }}
          >
            Certifications
          </Typography>

          <Typography
            sx={{
              color: "rgba(153,163,179,0.95)",
              maxWidth: 820,
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            To take an exam, you must first complete the related Job Role Path.
            You will also need a valid exam voucher.
          </Typography>

          {/* VOUCHERS */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", mb: 5 }}
          >
            <Typography sx={{ color: "rgba(153,163,179,0.95)", fontSize: 14 }}>
              Vouchers owned:
            </Typography>

            <Box
              sx={{
                height: 38,
                px: 1.3,
                borderRadius: 1.6,
                bgcolor: C.paper2,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              {/* tiny lime ticket placeholder */}
              <Box
                sx={{
                  width: 16,
                  height: 12,
                  borderRadius: 0.7,
                  bgcolor: C.lime,
                  boxShadow: "0 0 0 3px rgba(166,250,18,0.08)",
                }}
              />
              <Typography sx={{ fontWeight: 900, fontSize: 18 }}>0</Typography>

              <IconButton
                size="small"
                sx={{
                  ml: 0.5,
                  width: 26,
                  height: 26,
                  borderRadius: 1.3,
                  border: `1px solid ${C.border2}`,
                  color: "rgba(230,241,255,0.75)",
                }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Stack>

          {/* LIST */}
          <Stack spacing={2.5}>
            {certsPrivateInfo?.map((x) => (
              <Box
                key={x.id}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${C.border}`,
                  bgcolor: "rgba(18,27,42,0.55)",
                  overflow: "hidden",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
                  // Dodane właściwości:
                  transition: "all 0.3s ease-in-out", // Płynność efektu
                  "&:hover": {
                    bgcolor: "rgba(18,27,42,0.8)",
                    boxShadow: "0 22px 50px rgba(0,0,0,0.45)",

                    // 1. Rozjaśnia wszystko wizualnie (tekst, grafiki, ikony)
                    filter: "brightness(1.2)",
                    color: "#fff",

                    // 3. Jeśli masz tam ikony MUI, to je również podświetli:
                    "& .MuiSvgIcon-root": {
                      color: "primary.light", // lub konkretny kolor np. "#fff"
                    },
                  },
                }}
                onClick={() => navigate(`/certificate/true/${x.id}`)}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "520px 1fr" },
                    alignItems: "stretch",
                    minHeight: { xs: 420, md: 330 },
                  }}
                >
                  {/* LEFT - image placeholder */}
                  <Box
                    sx={{
                      position: "relative",
                      borderRight: { xs: "none", md: `1px solid ${C.border}` },
                      minHeight: { xs: 210, md: "100%" },
                      backgroundImage: `linear-gradient(135deg, rgba(255,66,66,0.85) 0%, rgba(60,20,40,0.85) 65%, rgba(10,15,30,0.85) 100%), url(${getCertImage(x.name)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* subtle dot/mesh */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 45%)," +
                          "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 10px)",
                        opacity: 0.22,
                        pointerEvents: "none",
                      }}
                    />
                    {/* badge text */}
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 22,
                        right: 22,
                        fontWeight: 900,
                        letterSpacing: 3,
                        fontSize: 20,
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      CJCA
                    </Typography>
                  </Box>

                  {/* RIGHT */}
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "clamp(22px, 2.3vw, 34px)",
                          lineHeight: 1.15,
                          whiteSpace: "pre-line",
                          flex: 1,
                        }}
                      >
                        {x.name}
                      </Typography>

                      <IconButton
                        sx={{
                          mt: 0.4,
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          color: "rgba(230,241,255,0.65)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                        }}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    </Stack>

                    <Typography
                      sx={{
                        color: "rgba(153,163,179,0.95)",
                        lineHeight: 1.8,
                        fontSize: 14,
                        maxWidth: 720,
                      }}
                    >
                      {x.description}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* progress pill */}
                    <Box
                      sx={{
                        borderRadius: 999,
                        border: `1px solid ${C.border}`,
                        bgcolor: "rgba(15,21,41,0.35)",
                        px: 2,
                        py: 1.3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.6,
                        width: { xs: "100%", md: "82%" },
                        maxWidth: 520,
                      }}
                    >
                      {/* avatar placeholder */}
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 999,
                          border: `2px solid rgba(166,250,18,0.35)`,
                          bgcolor:
                            "radial-gradient(circle at 30% 30%, rgba(166,250,18,0.35) 0%, rgba(15,23,38,0.0) 60%)," +
                            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                          boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                        }}
                      />

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: 12.5,
                            color: "rgba(153,163,179,0.95)",
                            lineHeight: 1.2,
                          }}
                        >
                          First Complete
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 13.5,
                            fontWeight: 800,
                            color: C.text,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {x.pathName}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 400,
                          color: C.textDim,
                          fontSize: 13.5,
                        }}
                      >
                        {x.userPathPercentCompleted == 0
                          ? "Not started"
                          : `${x.userPathPercentCompleted}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
