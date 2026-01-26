import {
  Box,
  Button,
  Chip,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RouteIcon from "@mui/icons-material/Route";
import React, { useEffect, useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SchoolIcon from "@mui/icons-material/School";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SubNavMenu from "./Common/Navigation/SubNavMenu";
import default_module from "./assets/default_module.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  getFilteredModules,
  toggleModuleFavourite,
  type FilteredModuleListItem,
} from "./Services/ModulesService";
import { useNavigate, useLocation } from "react-router-dom";
import PathsLibraryPage from "./PathsLibraryPage";
import CertsLibraryPage from "./CertsLibraryPage";

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

const moduleImages = import.meta.glob(
  ["./assets/modules/*.{png,jpg,jpeg,webp}", "./assets/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" },
) as Record<string, string>;

const moduleImageMap = Object.fromEntries(
  Object.entries(moduleImages).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const slug = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
    return [slug, url];
  }),
);

const getModuleImage = (slug: string) =>
  moduleImageMap[slug.toLowerCase()] ?? default_module;

function FilterPill({
  label,
  options = [],
  selected = [],
  onToggle,
  single = false,
}: {
  label: string;
  options?: string[];
  selected: string[];
  onToggle: (val: string) => void;
  single?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              ml: 1,
              transform: open ? "rotate(180deg)" : "none",
              transition: "0.2s",
            }}
          />
        }
        sx={{
          borderColor: "transparent",
          color: selected.length > 0 ? colors.lime : colors.text,
          bgcolor: colors.paper,
          textTransform: "none",
          px: 2,
          height: 50,
          borderRadius: 2,
          "&:hover": {
            borderColor: "rgba(255,255,255,0.24)",
            bgcolor: "#212b3b",
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{label}</Typography>
          {selected.length > 0 && !single && (
            <Box
              sx={{
                bgcolor: colors.lime,
                color: "#000",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {selected.length}
            </Box>
          )}
        </Stack>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            bgcolor: "#1a2332",
            minWidth: 220,
            mt: 0.2,
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              onToggle(option);
              if (single) setAnchorEl(null);
            }}
            sx={{ py: 1.2 }}
          >
            <ListItemText
              primary={option}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 600,
                color: selected.includes(option) ? colors.lime : "inherit",
              }}
            />
            {!single && (
              <Checkbox
                checked={selected.includes(option)}
                sx={{
                  p: 0,
                  color: "rgba(255,255,255,0.2)",
                  "&.Mui-checked": { color: colors.lime },
                }}
              />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function PillWithoutIcon({ label, moduleToggle, setModuleToggle }: any) {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "transparent",
        color: colors.text,
        bgcolor: moduleToggle ? colors.paper : "transparent",
        textTransform: "none",
        px: 2,
        height: 50,
        borderRadius: 2,
        "&:hover": { borderColor: "rgba(255,255,255,0.24)" },
      }}
      onClick={() => setModuleToggle(label === "Favourite Modules")}
    >
      {label}
    </Button>
  );
}

function ModuleCard({
  title,
  tags,
  difficulty,
  time,
  tier,
  isCompleted = false,
  id,
  imageSrc,
  isFavourite = false,
  onFavouriteToggle,
}: {
  title: string;
  tags: string[];
  difficulty: string;
  time: string;
  tier: string;
  isCompleted?: boolean;
  id: string;
  imageSrc: string;
  isFavourite?: boolean;
  onFavouriteToggle?: (moduleId: string) => void;
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [favourite, setFavourite] = useState(isFavourite);

  useEffect(() => {
    setFavourite(isFavourite);
  }, [isFavourite]);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavouriteToggle) {
      onFavouriteToggle(id);
      setFavourite(!favourite);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: isCompleted ? "#0e1929ff" : colors.paper,
        border: `0.1px solid ${isCompleted ? "#d3d3d32c" : colors.border}`,
        borderRadius: 2,
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          "& .module-image": {
            transform: "scale(1.015)",
            filter: "brightness(0.85)",
          },
          "& .footer-stats": {
            bgcolor: "rgba(255, 255, 255, 0.15)",
            color: colors.text,
          },
        },
      }}
      onClick={() => navigate(`/module-overview/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Serce w prawym górnym rogu */}
      {(isHovered || favourite) && (
        <IconButton
          onClick={handleFavouriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          {favourite ? (
            <FavoriteIcon sx={{ color: "#FF1744" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: colors.text }} />
          )}
        </IconButton>
      )}
      <Box
        sx={{
          p: 1.5,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box
          src={imageSrc}
          component="img"
          className="module-image"
          sx={{
            width: "100%",
            borderRadius: 2,
            transition: "transform 0.4s ease-in-out",
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          {tags?.map((t: string) => (
            <Chip
              key={t}
              size="small"
              label={t}
              sx={{
                bgcolor: "#0A0F1E",
                color: colors.textDim,
                borderRadius: 1,
              }}
            />
          ))}
        </Stack>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
      </Box>
      <Box
        className="footer-stats"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${colors.border}`,
          px: 1.5,
          py: 0.5,
          mt: "auto",
          transition: "all 0.3s ease",
        }}
      >
        {isCompleted ? (
          <Box
            sx={{
              color: colors.textDim,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CheckCircleIcon sx={{ color: colors.lime, width: 18 }} />
            <Typography variant="body2" sx={{ color: colors.lime }}>
              Completed
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              flexDirection: "row",
              gap: 1,
              display: "flex",
              alignItems: "center",
              color: colors.textDim,
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderRight: `1px solid ${colors.border}`,
                pr: 1,
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <BarChartIcon sx={{ width: 20 }} />{" "}
              <Typography variant="body2">{difficulty}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                borderRight: `1px solid ${colors.border}`,
                pr: 1,
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <WatchLaterIcon sx={{ width: 20 }} />{" "}
              <Typography variant="body2">{time}</Typography>
            </Box>
            <Box sx={{ display: "flex", pr: 1 }}>
              <Typography variant="body2">{tier}</Typography>
            </Box>
          </Box>
        )}
        <IconButton size="small" sx={{ color: colors.textDim }}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function LibraryPage() {
  const location = useLocation();
  const [alignment, setAlignment] = useState("modules");
  const [moduleToggle, setModuleToggle] = useState(
    (location.state as { showFavourites?: boolean })?.showFavourites ?? false,
  );
  const [modules, setModules] = useState<FilteredModuleListItem[]>([]);

  // Stan filtrów
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    category: [],
    difficulty: [],
    tier: [],
    type: [],
    state: [],
    sortBy: [],
  });

  useEffect(() => {
    fetchModules();
  }, [selectedFilters, moduleToggle]);

  async function fetchModules() {
    const res = await getFilteredModules({
      category: selectedFilters.category,
      difficulty: selectedFilters.difficulty,
      tier: selectedFilters.tier,
      type: selectedFilters.type,
      state: selectedFilters.state[0] || "",
      sortBy: selectedFilters.sortBy[0] || "",
    });

    // Jeśli wybrano "Favourite Modules", filtruj tylko ulubione
    let filteredRes = res;
    if (moduleToggle) {
      filteredRes = res.filter((m) => m.isFavourite);
    }

    setModules(filteredRes);
  }

  const handleFavouriteToggle = async (moduleId: string) => {
    try {
      const newFavouriteState = await toggleModuleFavourite(moduleId);
      // Aktualizuj stan lokalny modułu
      setModules((prevModules) =>
        prevModules.map((m) =>
          m.id === moduleId ? { ...m, isFavourite: newFavouriteState } : m,
        ),
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const handleToggle = (key: string, val: string, single: boolean = false) => {
    setSelectedFilters((prev) => {
      if (single) return { ...prev, [key]: prev[key][0] === val ? [] : [val] };
      const current = prev[key];
      const next = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () =>
    setSelectedFilters({
      category: [],
      difficulty: [],
      tier: [],
      type: [],
      state: [],
      sortBy: [],
    });

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
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, val) => val && setAlignment(val)}
          sx={{
            bgcolor: colors.paper,
            m: 3,
            mt: 5,
            borderRadius: 2,
            height: 60,
            width: "100%",
            maxWidth: 1250,
            "& .MuiToggleButton-root": {
              border: "none",
              color: "gray",
              flex: 1,
              borderRadius: "8px !important",
              mx: 0.5,
              my: 0.5,
              "&.Mui-selected": { color: "white", bgcolor: "#252f41ff" },
            },
          }}
        >
          <ToggleButton value="modules">
            <ViewModuleIcon sx={{ mr: 0.75 }} /> Modules
          </ToggleButton>
          <ToggleButton value="paths">
            <RouteIcon sx={{ mr: 0.75 }} /> Paths
          </ToggleButton>
          <ToggleButton value="certifications">
            <SchoolIcon sx={{ mr: 0.75 }} /> Certifications
          </ToggleButton>
        </ToggleButtonGroup>
        {alignment === "modules" && (
          <Box maxWidth="1250px" sx={{ py: 6, width: "100%", px: 3 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 7 }}>
              Modules
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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

            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 4, flexWrap: "wrap", gap: 1.5 }}
            >
              <FilterPill
                label="Categories"
                options={["General", "DevOps", "Developer"]}
                selected={selectedFilters.category}
                onToggle={(v) => handleToggle("category", v)}
              />
              <FilterPill
                label="Difficulty"
                options={["Fundamental", "Easy", "Medium", "Hard", "Insane"]}
                selected={selectedFilters.difficulty}
                onToggle={(v) => handleToggle("difficulty", v)}
              />
              <FilterPill
                label="Tiers"
                options={["Tier 0", "Tier I", "Tier II", "Tier III", "Tier IV"]}
                selected={selectedFilters.tier}
                onToggle={(v) => handleToggle("tier", v)}
              />
              <FilterPill
                label="Type"
                options={["Regular"]}
                selected={selectedFilters.type}
                onToggle={(v) => handleToggle("type", v)}
              />
              <FilterPill
                label="State"
                options={["To Do", "In Progress", "Completed"]}
                selected={selectedFilters.state}
                onToggle={(v) => handleToggle("state", v, true)}
                single
              />
              <Box sx={{ flexGrow: 1 }} />
              <FilterPill
                label={
                  selectedFilters.sortBy[0]
                    ? `View By: ${selectedFilters.sortBy[0]}`
                    : "View By: Default"
                }
                options={[
                  "Default",
                  "Newest",
                  "Difficulty: Low to High",
                  "Difficulty: High to Low",
                ]}
                selected={selectedFilters.sortBy}
                onToggle={(v) => handleToggle("sortBy", v, true)}
                single
              />
            </Stack>

            {/* Aktywne filtry */}
            {Object.values(selectedFilters).some((a) => a.length > 0) && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}
              >
                {Object.entries(selectedFilters).map(([key, vals]) =>
                  vals.map((v) => (
                    <Chip
                      key={v}
                      label={v}
                      onDelete={() =>
                        handleToggle(
                          key,
                          v,
                          key === "state" || key === "sortBy",
                        )
                      }
                      deleteIcon={<ClearIcon style={{ color: "white" }} />}
                      sx={{ bgcolor: "#212b3b", borderRadius: 1 }}
                    />
                  )),
                )}
                <Button
                  onClick={clearFilters}
                  startIcon={<DeleteOutlineIcon />}
                  sx={{ color: colors.textDim, ml: 2 }}
                >
                  Clear all filters
                </Button>
              </Stack>
            )}

            <Typography fontSize={22} fontWeight={800}>
              {modules.length || 0} Modules
            </Typography>
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
              {modules.map((module) => {
                const moduleTags = [
                  Array.isArray(module.category)
                    ? module.category[0]
                    : module.category || "GENERAL",
                ];
                if (module.type) {
                  moduleTags.push(module.type);
                }
                return (
                  <ModuleCard
                    key={module.id}
                    title={module.name}
                    tags={moduleTags}
                    difficulty={module.difficulty.substring(0, 4)}
                    time={module.estimatedHours + "h"}
                    tier={module.tier}
                    isCompleted={module.userPercentCompleted === 100}
                    id={module.id}
                    imageSrc={getModuleImage(module.slug)}
                    isFavourite={module.isFavourite}
                    onFavouriteToggle={handleFavouriteToggle}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {alignment === "paths" && <PathsLibraryPage />}
        {alignment === "certifications" && <CertsLibraryPage />}
      </Box>
    </ThemeProvider>
  );
}
