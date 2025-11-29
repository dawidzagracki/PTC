import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  {
    name: "Certifications",
    link: "/certifications",
  },
  {
    name: "Paths",
    link: "/paths",
  },
  {
    name: "Modules",
    link: "/modules",
  },
  {
    name: "Business",
    link: "/business",
  },
  {
    name: "PTC Labs",
    link: "/ptc-labs",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
];

export default function MainNavMenu() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(6px)",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          minHeight: 72,
        }}
      >
        <Box sx={{ width: 40, height: 40, mr: 2 }} />
        <Link to="/">
          <Box sx={{ mr: 4, mt: 1.3 }}>
            <img src={logo} width={90} />
          </Box>
        </Link>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {navItems.map((x, index) => (
            <Button
              key={index}
              color="inherit"
              variant="text"
              sx={{ opacity: 0.9, fontSize: 16, fontWeight: 500 }}
              onClick={() => navigate(x.link)}
            >
              {x.name}
            </Button>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1.5}>
          <Button
            color="inherit"
            variant="text"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register-step-1")}
          >
            Start for Free
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
