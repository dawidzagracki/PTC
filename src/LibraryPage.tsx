import {
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  MenuItem,
  responsiveFontSizes,
  Select,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import linux from "./assets/linux.png";

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

const colors = {
  bg: "background.default",
  paper: "background.paper",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
  border: "rgba(255,255,255,0.06)",
};

function Pill({ label }: { label: string }) {
  return (
    <Button
      variant="outlined"
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        borderColor: "rgba(255,255,255,0.12)",
        color: colors.text,
        bgcolor: colors.paper,
        textTransform: "none",
        px: 2,
        height: 40,
        borderRadius: 2,
        "&:hover": { borderColor: "rgba(255,255,255,0.24)" },
      }}
    >
      {label}
    </Button>
  );
}

function PillWithoutIcon({
  label,
  moduleToggle,
  setModuleToggle,
}: {
  label: string;
  moduleToggle: boolean;
  setModuleToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "rgba(255,255,255,0.12)",
        color: colors.text,
        bgcolor: moduleToggle ? colors.paper : colors.bg,
        textTransform: "none",
        px: 2,
        height: 40,
        borderRadius: 2,
        "&:hover": { borderColor: "rgba(255,255,255,0.24)" },
      }}
      onClick={() =>
        setModuleToggle(label === "Favourite Modules" ? true : false)
      }
    >
      {label}
    </Button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModuleCard({ title, tags, difficulty, time, tier, progress }: any) {
  return (
    <Box
      sx={{
        bgcolor: colors.paper,
        border: `1px solid ${colors.border}`,
        borderRadius: 2,
        p: 2.5,
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        position: "relative",
      }}
    >
      <img src={linux} width="100%" />
      {/* header badges */}
      <Stack direction="row" spacing={1} alignItems="center">
        {tags?.map((t: string) => (
          <Chip
            key={t}
            size="small"
            label={t}
            sx={{ bgcolor: "#0A0F1E", color: colors.textDim, borderRadius: 1 }}
          />
        ))}
        {progress && (
          <Chip
            size="small"
            label={progress}
            sx={{
              ml: "auto",
              bgcolor: "#2B2F45",
              color: colors.text,
              position: "absolute",
              zIndex: 1,
              top: 30,
              right: 30,
              borderRadius: 1,
            }}
          />
        )}
      </Stack>

      {/* title */}
      <Typography variant="h6" sx={{ fontWeight: 900 }}>
        {title}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ color: colors.textDim, mt: "auto" }}
      >
        <Typography variant="body2">{difficulty}</Typography>
        <Typography variant="body2">{time}</Typography>
        <Typography variant="body2">{tier}</Typography>
      </Stack>

      <Divider sx={{ borderColor: colors.border, my: 1 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ color: colors.textDim }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              bgcolor: colors.lime,
              borderRadius: "50%",
            }}
          />
          <Typography variant="body2">Completed</Typography>
        </Stack>
        <IconButton size="small" sx={{ color: colors.textDim }}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default function LibraryPage() {
  const [alignment, setAlignment] = React.useState("web");
  const [moduleToggle, setModuleToggle] = React.useState(false);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubNavMenu />
      <Box
        sx={{
          bgcolor: colors.bg,
          minHeight: "100vh",
          color: colors.text,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top app bar substitute */}

        <ToggleButtonGroup
          sx={{
            bgcolor: colors.paper,
            m: 3,
            mt: 5,
            borderRadius: 2,
            display: "flex",
            maxWidth: 1490,
            width: "100%",
          }}
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton sx={{ minWidth: "33%" }} value="web">
            Modules
          </ToggleButton>
          <ToggleButton sx={{ minWidth: "34%" }} value="android">
            Paths
          </ToggleButton>
          <ToggleButton sx={{ minWidth: "33%" }} value="ios">
            Certifications
          </ToggleButton>
        </ToggleButtonGroup>

        <Container maxWidth="xl" sx={{ py: 6 }}>
          {/* Title */}
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
            Modules
          </Typography>

          {/* Secondary tabs */}
          <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
            <PillWithoutIcon
              label="All Modules"
              moduleToggle={!moduleToggle}
              setModuleToggle={setModuleToggle}
            />
            <PillWithoutIcon
              label="Favourite Modules"
              moduleToggle={moduleToggle}
              setModuleToggle={setModuleToggle}
            />
          </Stack>
          <Divider sx={{ borderColor: colors.border, mb: 3 }} />

          {/* Filters row */}
          <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: "wrap" }}>
            <Pill label="Categories" />
            <Pill label="Difficulty" />
            <Pill label="Tiers" />
            <Pill label="Type" />
            <Pill label="State" />
            <Pill label="Status" />

            <Box sx={{ flexGrow: 1 }} />
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ ml: "auto" }}
            >
              <Typography variant="body2" sx={{ color: colors.textDim }}>
                View By:
              </Typography>
              <Select
                size="small"
                value="Default"
                sx={{
                  color: colors.text,
                  bgcolor: colors.paper,
                  borderRadius: 2,

                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Newest">Newest</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Typography fontSize={22} fontWeight={800}>
            All Modules
          </Typography>
          {/* Cards grid */}
          <Box
            sx={{
              display: "grid",
              pt: 2,
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            <ModuleCard
              title="Learning Process"
              tags={["REGULAR", "GENERAL"]}
              difficulty="Easy"
              time="6h"
              tier="Tier 0"
              progress=""
            />
            <ModuleCard
              title="Intro To Academy"
              tags={["REGULAR", "GENERAL"]}
              difficulty="Easy"
              time="6h"
              tier="Tier 0"
              progress=""
            />
            <ModuleCard
              title="Hacking WordPress"
              tags={["REGULAR", "OFFENSIVE"]}
              difficulty="Easy"
              time="6h"
              tier="Tier II"
              progress="In Progress"
            />
            <ModuleCard
              title="Linux Fundamentals"
              tags={["REGULAR", "GENERAL"]}
              difficulty="Fundamental"
              time="6h"
              tier="Tier 0"
              progress=""
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
