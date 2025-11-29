import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import cyberchip from "../../assets/cyberchip.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";

const navItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Library",
    link: "/library",
  },
  {
    name: "Resources",
    link: "/#",
  },
];

export default function SubNavMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(6px)",
        alignContent: "center",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          minHeight: 72,
        }}
      >
        <Link to="/dashboard">
          <Box sx={{ mr: 4, mt: 1.3 }}>
            <img src={logo} width={90} />
          </Box>
        </Link>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {navItems.map((x, index) =>
            x.name === "Resources" ? (
              <Button
                key={index}
                color="inherit"
                variant="text"
                sx={{ opacity: 0.9, fontSize: 16, fontWeight: 500 }}
                onClick={handleMenuOpen} // otwiera menu
              >
                {x.name} ▾
              </Button>
            ) : (
              <Button
                key={index}
                variant="text"
                sx={{
                  opacity: 0.9,
                  fontSize: 16,
                  fontWeight: 500,
                  color: location.pathname == x.link ? "#A6FA12" : "inherit",
                  borderBottom:
                    location.pathname == x.link ? "2px solid #A6FA12" : "none",
                }}
                onClick={() => navigate(x.link)}
              >
                {x.name}
              </Button>
            )
          )}
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              ml: 1,
              bgcolor: "#1a2332",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              width: 220,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/htb-academy");
              handleMenuClose();
            }}
            sx={{ justifyContent: "space-between" }}
          >
            HTB x Academy
            <OpenInNewIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/blog");
              handleMenuClose();
            }}
            sx={{ justifyContent: "space-between" }}
          >
            Blog
            <OpenInNewIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/discord");
              handleMenuClose();
            }}
            sx={{ justifyContent: "space-between" }}
          >
            Discord
            <OpenInNewIcon />
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />
        <AppsIcon sx={{ color: "rgba(255, 255, 255, 0.51)", mr: 1 }} />
        <HelpOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.51)", mr: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", mr: 3, gap: 0 }}>
          <img src={cyberchip} height={40} />
          <Typography>20</Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ mr: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register-step-1")}
          >
            Upgrade
          </Button>
          <Box sx={{ width: 40, bgcolor: "lime", borderRadius: 20 }}></Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
