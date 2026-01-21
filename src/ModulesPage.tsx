import {
  Box,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MainNavMenu from "./Common/Navigation/MainNavMenu";
import InfoBar from "./Common/InfoBar";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  getAllModules,
  type ModuleListItemDto,
} from "./Services/ModulesService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  bg: "#0A0F1E",
  card: "#0F1529",
  border: "rgba(255,255,255,0.06)",
  text: "#E6F1FF",
  textDim: "#99A3B3",
  lime: "#A6FA12",
};

function Tag({ label }: { label: string }) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: "#151d30",
        color: C.lime,
        fontWeight: 700,
        borderRadius: 0.75,
        height: 24,
      }}
    />
  );
}

function GreyTag({ label }: { label: string }) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: "#151d30",
        color: C.text,
        fontWeight: 600,
        borderRadius: 0.75,
        height: 24,
      }}
    />
  );
}

function ModuleCard(props: {
  title: string;
  description: string;
  primaryTags: string[];
  secondaryTags: string[];
  sections: string;
  slug: string;
  id: string;
}) {
  const { title, description, primaryTags, secondaryTags, sections, id } =
    props;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        minHeight: 420,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0px 0px 0px rgba(0,0,0,0.0)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 25px rgba(0,0,0,0.35)",
        },
      }}
      onClick={() =>
        navigate(`/base-module-overview/${id}`, {
          state: {
            numberOfSections: sections,
            name: title,
            description: description,
            difficulty: primaryTags,
            tag: secondaryTags,
            id: id,
          },
        })
      }
    >
      <Box
        sx={{
          height: 240,
          background:
            "radial-gradient(circle at 0% 0%, #233251 0, #0F1529 45%, #0A0F1E 100%)",
        }}
      />
      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, mb: 1.5, letterSpacing: 0.2 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: C.textDim,
            mb: 2.5,
            lineHeight: 1.6,
          }}
        >
          {description.length > 200
            ? description.slice(0, 160) + "..."
            : description}
        </Typography>
        <Divider sx={{ borderColor: C.border }} />
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          sx={{ mt: 2, mb: 1.5 }}
        >
          {primaryTags.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {secondaryTags.map((t) => (
            <GreyTag key={t} label={t} />
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <FormatListBulletedIcon />
            <Typography variant="body2">{sections}</Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={0.75}
          sx={{ color: C.textDim, fontSize: 13 }}
        ></Stack>
      </Box>
    </Box>
  );
}

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

export default function ModulesPage() {
  const [modules, setModules] = useState<ModuleListItemDto[]>([]);

  useEffect(() => {
    fetchPaths();
  }, []);

  async function fetchPaths() {
    await getAllModules().then((modules) => {
      setModules(modules);
      console.log(modules);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InfoBar />
      <MainNavMenu />
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          pt: 5,
          pb: 7,
          mb: 0,
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 56px)",
            mb: 2,
          }}
        >
          IT Courses
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: C.text,
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 10, pb: 10 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {modules.map((item, index) => (
              <ModuleCard
                title={item.name}
                description={item.description || ""}
                primaryTags={[item.difficulty]}
                secondaryTags={[item.type]}
                sections={item.sectionsCount + " sections"}
                key={index}
                slug={item.slug}
                id={item.id}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
