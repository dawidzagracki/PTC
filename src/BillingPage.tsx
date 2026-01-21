import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
  responsiveFontSizes,
  Grid,
} from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BoltIcon from "@mui/icons-material/Bolt";
import StarsIcon from "@mui/icons-material/Stars";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckIcon from "@mui/icons-material/Check";
import SchoolIcon from "@mui/icons-material/School";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HexagonIcon from "@mui/icons-material/Hexagon";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import ExamsPage from "./ExamsPage";

const C = {
  bg: "#0A0F1E",
  surface: "#111927",
  cardBg: "#1a2332",
  border: "rgba(255,255,255,0.07)",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  limeText: "#0B1220",
  goldA: "#F59E0B",
  goldB: "#E879F9",
  btnDark: "#273246",
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

type Plan = {
  key: string;
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  priceAnnual: string;
  buttonLabelAnnual: string;
  buttonVariant: "lime" | "gradient" | "ghost";
  tag?: { text: string; color: "green" | "purple" };
  bullets: Array<{ main: string; sub?: string }>;
};

const annualPlans: Plan[] = [
  {
    key: "starter",
    icon: <BoltIcon sx={{ fontSize: 18 }} />,
    name: "Starter",
    subtitle: "Fall In love with HTB Academy",
    priceAnnual: "Free",
    buttonLabelAnnual: "Current plan",
    buttonVariant: "ghost",
    tag: { text: "Current Plan", color: "green" },
    bullets: [
      { main: "Unlock each Module as you need it" },
      { main: "Unlimited Pwnbox usage", sub: "After the first purchase" },
      { main: "HTB Support" },
    ],
  },
  {
    key: "silver",
    icon: <StarsIcon sx={{ fontSize: 18 }} />,
    name: "Silver Annual",
    subtitle: "Get started with Cyber Security",
    priceAnnual: "$ 490",
    buttonLabelAnnual: "Subscribe for $490/year",
    buttonVariant: "lime",
    bullets: [
      { main: "96 Modules instant access" },
      { main: "5 Job Role Paths instant access" },
      { main: "2 Exam Vouchers", sub: "(valid for 1 year)" },
      { main: "Exam Voucher Switching" },
      { main: "Step-by-step module solutions" },
      { main: "Unlimited Pwnbox usage" },
      { main: "CPE credits submission" },
      { main: "HTB Support" },
    ],
  },
  {
    key: "gold",
    icon: <WorkspacePremiumIcon sx={{ fontSize: 18 }} />,
    name: "Gold Annual",
    subtitle: "Advance in Cyber Security",
    priceAnnual: "$ 1260",
    buttonLabelAnnual: "Subscribe for $1260/year",
    buttonVariant: "gradient",
    tag: { text: "Best Value", color: "purple" },
    bullets: [
      { main: "144 Modules instant access", sub: "48 more than Silver" },
      { main: "8 Job Role Paths instant access" },
      { main: "2 Exam Vouchers" },
      { main: "Exam Voucher Switching" },
      { main: "Step-by-step module solutions" },
      { main: "Unlimited Pwnbox usage" },
      { main: "CPE credits submission" },
    ],
  },
];

// --- NOWY KOMPONENT PORTFELA (TOP BAR) ---
function TopWallet() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 6, justifyContent: "space-between", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 0.8,
          borderRadius: 2,
          bgcolor: "#111927",
          border: `1px solid ${C.border}`,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <ViewInArIcon sx={{ color: C.lime, fontSize: 18 }} />
          <Typography sx={{ fontWeight: 800, fontSize: 14 }}>50</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <ConfirmationNumberIcon sx={{ color: C.lime, fontSize: 18 }} />
          <Typography sx={{ fontWeight: 800, fontSize: 14 }}>0</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{ width: 14, height: 14, bgcolor: C.lime, borderRadius: "50%" }}
          />
          <Typography sx={{ fontWeight: 800, fontSize: 14 }}>$ 0.00</Typography>
        </Stack>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<RedeemIcon sx={{ fontSize: 18 }} />}
          sx={{
            bgcolor: C.btnDark,
            color: C.text,
            fontWeight: 700,
            px: 2,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#323e54" },
          }}
        >
          Redeem Voucher
        </Button>
        <Button
          startIcon={<CardGiftcardIcon sx={{ fontSize: 18 }} />}
          sx={{
            bgcolor: C.btnDark,
            color: C.text,
            fontWeight: 700,
            px: 2,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#323e54" },
          }}
        >
          Redeem Gift Card
        </Button>
      </Stack>
    </Stack>
  );
}

function CubesIllustration({ intensity }: { intensity: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 3,
      }}
    >
      {[...Array(intensity)].map((_, i) => (
        <ViewInArIcon
          key={i}
          sx={{
            color: C.lime,
            fontSize: 20 + i * 2,
            position: "absolute",
            transform: `translate(${Math.sin(i) * 12}px, ${Math.cos(i) * 8}px)`,
            opacity: 0.8,
          }}
        />
      ))}
    </Box>
  );
}

// --- POPRAWIONY WIDOK MONTHLY (RÓWNA WYSOKOŚĆ) ---
function MonthlyView() {
  const cubePlans = [
    {
      name: "Silver",
      sub: "Get started with Cyber Security",
      cubes: "200",
      price: "18",
      intensity: 6,
    },
    {
      name: "Gold",
      sub: "Advance in Cyber Security",
      cubes: "500",
      price: "38",
      intensity: 10,
    },
    {
      name: "Platinum",
      sub: "Master Cyber Security",
      cubes: "1000",
      price: "68",
      intensity: 15,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 2, alignItems: "stretch" }}>
      {/* INSTANT ACCESS */}
      <Grid size={{ xs: 12, lg: 3 }}>
        <Typography sx={{ fontWeight: 900, mb: 2, fontSize: 18 }}>
          Instant Access
        </Typography>
        <Box
          sx={{
            bgcolor: C.cardBg,
            borderRadius: 2,
            border: `1px solid ${C.border}`,
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <SchoolIcon sx={{ fontSize: 20, color: C.textDim }} />
            <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
              Student
            </Typography>
          </Stack>
          <Typography sx={{ color: C.textDim, fontSize: 13, mb: 4 }}>
            For university and academic institution students
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              $ 8
              <Typography
                component="span"
                sx={{ fontSize: 14, color: C.textDim, ml: 0.5 }}
              >
                /month *
              </Typography>
            </Typography>
            <Button
              fullWidth
              disabled
              variant="contained"
              sx={{
                bgcolor: "rgba(255,255,255,0.05) !important",
                color: "rgba(255,255,255,0.3) !important",
                mb: 4,
                fontWeight: 800,
              }}
            >
              Only For Students
            </Button>
          </Box>

          <Stack spacing={1.5}>
            {[
              "96 Modules instant access",
              "5 Job Role Paths instant access",
              "Unlimited Pwnbox usage",
              "CPE credits submission",
              "HTB Support",
              "Upgrade at anytime",
            ].map((text, i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                <CheckIcon sx={{ fontSize: 16, color: C.lime }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Grid>

      {/* CUBE SUBSCRIPTION */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <Typography sx={{ fontWeight: 900, mb: 2, fontSize: 18 }}>
          Cube Subscription
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ height: "calc(100% - 44px)", alignItems: "stretch" }}
        >
          {cubePlans.map((plan) => (
            <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: C.cardBg,
                  borderRadius: 2,
                  border: `1px solid ${C.border}`,
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <HexagonIcon sx={{ fontSize: 16, color: C.textDim }} />
                  <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                    {plan.name}
                  </Typography>
                </Stack>
                <Typography sx={{ color: C.textDim, fontSize: 12, mb: 2 }}>
                  {plan.sub}
                </Typography>

                <CubesIllustration intensity={plan.intensity} />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
                    {plan.cubes}
                    <Typography
                      component="span"
                      sx={{ fontSize: 14, color: C.textDim, ml: 0.5 }}
                    >
                      cubes/month
                    </Typography>
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: C.lime,
                      color: C.limeText,
                      fontWeight: 900,
                      mb: 4,
                      "&:hover": { bgcolor: "#95e010" },
                    }}
                  >
                    Subscribe for ${plan.price}/month
                  </Button>
                </Box>

                <Stack spacing={1.5}>
                  {[
                    "Unlimited Pwnbox usage",
                    "CPE credits submission",
                    "HTB Support",
                  ].map((text, i) => (
                    <Stack
                      key={i}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      <CheckIcon sx={{ fontSize: 16, color: C.textDim }} />
                      <Typography sx={{ fontSize: 13, color: C.textDim }}>
                        {text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

// --- POPRAWIONY PLAN CARD DLA ANNUAL (RÓWNA WYSOKOŚĆ) ---
function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${C.border}`,
        bgcolor: C.cardBg,
        p: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ color: C.textDim }}>{plan.icon}</Box>
          <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
            {plan.name}
          </Typography>
        </Stack>
        {plan.tag && (
          <Chip
            label={plan.tag.text}
            size="small"
            sx={{
              bgcolor:
                plan.tag.color === "green"
                  ? "rgba(166,250,18,0.15)"
                  : "rgba(195,92,255,0.2)",
              color: plan.tag.color === "green" ? C.lime : "#C35CFF",
              fontWeight: 800,
              borderRadius: 1,
            }}
          />
        )}
      </Stack>
      <Typography sx={{ color: C.textDim, fontSize: 14, mb: 5 }}>
        {plan.subtitle}
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>
          {plan.priceAnnual}
        </Typography>
        <Typography sx={{ color: C.textDim, fontSize: 12, mb: 4 }}>
          {plan.priceAnnual === "Free" ? "" : "/year*"}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor:
              plan.buttonVariant === "lime"
                ? C.lime
                : plan.buttonVariant === "gradient"
                ? C.goldA
                : "transparent",
            color: plan.buttonVariant === "ghost" ? C.textDim : C.limeText,
            border:
              plan.buttonVariant === "ghost" ? `1px solid ${C.border}` : "none",
            mb: 5,
            fontWeight: 900,
            py: 1.2,
          }}
        >
          {plan.buttonLabelAnnual}
        </Button>
      </Box>

      <Stack spacing={1.8}>
        {plan.bullets.map((b, i) => (
          <Stack key={i} direction="row" spacing={1.5}>
            <CheckIcon sx={{ fontSize: 18, color: C.textDim, mt: 0.2 }} />
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {b.main}
              </Typography>
              {b.sub && (
                <Typography sx={{ fontSize: 12, color: C.textDim }}>
                  {b.sub}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function BillingPage() {
  const [mode, setMode] = React.useState<"annual" | "monthly">("annual");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          pt: 4,
          pb: 10,
          background: "background.default",
        }}
      >
        <Container maxWidth="lg">
          {/* PRZYWRÓCONY TOP BAR */}
          <TopWallet />

          <Typography
            align="center"
            variant="h3"
            sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}
          >
            HTB Academy Plans
          </Typography>

          <Box
            sx={{
              width: 320,
              mx: "auto",
              mt: 4,
              mb: 8,
              p: 0.6,
              borderRadius: 10,
              bgcolor: "rgba(18,27,42,0.6)",
              border: `1px solid ${C.border}`,
            }}
          >
            <ToggleButtonGroup
              exclusive
              value={mode}
              onChange={(_, v) => v && setMode(v)}
              fullWidth
            >
              <ToggleButton
                value="annual"
                sx={{
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 800,
                  py: 1,
                }}
              >
                Annual
              </ToggleButton>
              <ToggleButton
                value="monthly"
                sx={{
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 800,
                  py: 1,
                }}
              >
                Monthly
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {mode === "annual" ? (
            <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
              {annualPlans.map((plan) => (
                <Grid key={plan.key} size={{ xs: 12, md: 4 }}>
                  <PlanCard plan={plan} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <MonthlyView />
          )}
        </Container>
        <ExamsPage />
      </Box>
    </ThemeProvider>
  );
}
