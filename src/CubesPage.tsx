import React from "react";
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
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SubNavMenu from "./Common/Navigation/SubNavMenu";

// Stałe kolorystyczne HTB
const C = {
  bg: "#0A0F1E",
  surface: "#111927",
  cardBg: "#1a2332",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
};

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: C.lime },
    background: { default: C.bg, paper: C.surface },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
theme = responsiveFontSizes(theme);

// Komponent wizualizujący stosy kostek (zamiast zdjęć)
function CubesIllustration({ intensity }: { intensity: number }) {
  // Generuje prosty stos kostek w zależności od pakietu
  return (
    <Box
      sx={{
        position: "relative",
        height: 80,
        width: 80,
        mb: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {[...Array(intensity)].map((_, i) => (
        <ViewInArIcon
          key={i}
          sx={{
            color: C.lime,
            fontSize: 24 + i * 2,
            position: "absolute",
            transform: `translate(${Math.sin(i) * 15}px, ${
              Math.cos(i) * 10
            }px)`,
            opacity: 0.7 + i * 0.05,
          }}
        />
      ))}
    </Box>
  );
}

interface CubePackageProps {
  amount: number;
  price: string;
  intensity: number;
}

function CubePackageCard({ amount, price, intensity }: CubePackageProps) {
  return (
    <Box
      sx={{
        bgcolor: C.cardBg,
        borderRadius: 2,
        p: 3,
        border: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "transform 0.2s, border-color 0.2s",
        height: "100%",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(166, 250, 18, 0.4)",
          bgcolor: "rgba(26, 35, 50, 0.8)",
        },
      }}
    >
      <CubesIllustration intensity={intensity} />

      <Typography
        sx={{ fontWeight: 800, fontSize: 32, color: C.text, lineHeight: 1 }}
      >
        {amount}
      </Typography>
      <Typography
        sx={{
          color: C.textDim,
          fontSize: 12,
          fontWeight: 700,
          mb: 2,
          textTransform: "lowercase",
        }}
      >
        cubes
      </Typography>

      <Typography
        sx={{
          color: C.lime,
          fontWeight: 800,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
        }}
      >
        for ${price}
        <Typography component="span" sx={{ fontSize: 12, ml: 0.5, mt: -0.5 }}>
          *
        </Typography>
      </Typography>
    </Box>
  );
}

export default function CubesPage() {
  const cubePackages = [
    { amount: 50, price: "5.00", intensity: 3 },
    { amount: 100, price: "10.00", intensity: 5 },
    { amount: 200, price: "20.00", intensity: 7 },
    { amount: 500, price: "50.00", intensity: 9 },
    { amount: 1000, price: "100.00", intensity: 12 },
    { amount: 5000, price: "500.00", intensity: 16 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
        <Container maxWidth="xl" sx={{ pt: 10 }}>
          {/* Header sekcji */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: C.text }}>
              Get Cubes
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
              <ViewInArIcon sx={{ color: C.lime, fontSize: 18 }} />
              <Typography sx={{ fontWeight: 800, color: C.text, fontSize: 14 }}>
                20
              </Typography>
            </Box>
          </Stack>

          {/* Siatka pakietów */}
          <Grid container spacing={2}>
            {cubePackages.map((pkg, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
                <CubePackageCard
                  amount={pkg.amount}
                  price={pkg.price}
                  intensity={pkg.intensity}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
