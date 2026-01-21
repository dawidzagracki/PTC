import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Fade,
} from "@mui/material";
import logo from "../../assets/logo.png";
import cyberchip from "../../assets/cyberchip.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { AuthService } from "../../Services/AuthService";

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
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const resourcesOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await AuthService.logout().finally(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(profileAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setProfileAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
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

        {/* GŁÓWNE LINKI */}
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
                onClick={handleMenuOpen}
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
                  color: location.pathname === x.link ? "#A6FA12" : "inherit",
                  borderBottom:
                    location.pathname === x.link ? "2px solid #A6FA12" : "none",
                }}
                onClick={() => navigate(x.link)}
              >
                {x.name}
              </Button>
            ),
          )}
        </Stack>

        {/* MENU RESOURCES */}
        <Menu
          anchorEl={anchorEl}
          open={resourcesOpen}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              ml: 1,
              bgcolor: "#1a2332",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 1,
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
            <OpenInNewIcon fontSize="small" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/blog");
              handleMenuClose();
            }}
            sx={{ justifyContent: "space-between" }}
          >
            Blog
            <OpenInNewIcon fontSize="small" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/discord");
              handleMenuClose();
            }}
            sx={{ justifyContent: "space-between" }}
          >
            Discord
            <OpenInNewIcon fontSize="small" />
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        <AppsIcon sx={{ color: "rgba(255, 255, 255, 0.51)", mr: 1 }} />
        <HelpOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.51)", mr: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", mr: 3, gap: 0 }}>
          <img src={cyberchip} height={40} />
          <Typography>20</Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ mr: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/billing")}
          >
            Upgrade
          </Button>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#A6FA12",
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "#101927",
              fontSize: 18,
            }}
            onClick={handleProfileMenuOpen}
          >
            {username?.charAt(0).toUpperCase()}
          </Box>
        </Stack>
      </Toolbar>
      <Menu
        anchorEl={profileAnchorEl}
        open={profileOpen}
        onClose={handleProfileMenuClose}
        TransitionComponent={Fade}
        transitionDuration={200}
        disableScrollLock
        PaperProps={{
          sx: {
            mt: 1,
            ml: -4,
            bgcolor: "#0f1724",
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.08)",
            width: 285,
            color: "#E6F1FF",
          },
        }}
      >
        <Box sx={{ px: 2, py: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>{username}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}
          >
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

        {/* PLAN */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Free Plan
            </Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            sx={{ color: "#A6FA12", fontWeight: 700, textTransform: "none" }}
            onClick={() => navigate("/billing")}
          >
            Upgrade
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

        {/* PROFILE */}
        <Typography
          variant="caption"
          sx={{
            px: 2,
            pt: 1,
            pb: 0.5,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          Profile
        </Typography>

        <Box onClick={() => navigate("/account-settings")}>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" sx={{ color: "#A6FA12" }} />
            </ListItemIcon>
            <ListItemText primary="Academy Account Settings" />
          </MenuItem>
        </Box>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <FavoriteBorderIcon fontSize="small" sx={{ color: "#A6FA12" }} />
          </ListItemIcon>
          <ListItemText primary="Favorite Modules" />
        </MenuItem>
        <Box onClick={() => navigate("/badges")}>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <EmojiEventsIcon fontSize="small" sx={{ color: "#A6FA12" }} />
            </ListItemIcon>
            <ListItemText primary="My Badges" />
          </MenuItem>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mt: 0.5 }} />

        {/* PAYMENT & REFERRALS */}
        <Typography
          variant="caption"
          sx={{
            px: 2,
            pt: 1,
            pb: 0.5,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          Payment & Referrals
        </Typography>
        <Box onClick={() => navigate("/billing")}>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <CreditCardIcon fontSize="small" sx={{ color: "#A6FA12" }} />
            </ListItemIcon>
            <ListItemText primary="Plans and Subscriptions" />
          </MenuItem>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mt: 0.5 }} />

        {/* SIGN OUT */}
        <Box onClick={() => handleLogout()}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ mt: 0.5, mb: 0.5 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "#A6FA12" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Box>
      </Menu>
    </AppBar>
  );
}
