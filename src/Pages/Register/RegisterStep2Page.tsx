import * as React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Colors matched to the HTB style used earlier
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#101927", paper: "#1a2332" },
    primary: { main: "#A6FA12" }, // lime button
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
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#0F1529",
          borderRadius: 10,
        },
        notchedOutline: { borderColor: "rgba(255,255,255,0.08)" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { backgroundColor: "#0F1529", borderRadius: 10 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 700 },
      },
    },
  },
});

export default function RegisterStep2Page() {
  const [showPw, setShowPw] = React.useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [password, setPassword] = React.useState("");

  const requirements = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(requirements).every(Boolean);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          justifyContent: "center",
          display: "flex",
          alignContent: "center",
          pt: "8%",
        }}
      >
        <img src={logo} width={110} />
      </Container>
      <Box
        sx={{
          minHeight: "35vh",
          bgcolor: "background.default",
          display: "grid",
          placeItems: "center",
          py: 0,
        }}
      >
        {/* Card */}
        <Container
          maxWidth="sm"
          disableGutters
          sx={{ justifyContent: "center", display: "flex" }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 2,
              p: { xs: 3, md: 4 },
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              width: "80%",
            }}
          >
            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
              Create a Path The Code Account
            </Typography>

            {/* Password */}
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: password.length == 0 ? 2 : 0 }}
            >
              <OutlinedInput
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw((s) => !s)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {password.length > 0 && (
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    {requirements.length ? (
                      <CheckCircleIcon color="success" sx={{ width: 20 }} />
                    ) : (
                      <CancelIcon color="error" sx={{ width: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least 8 characters" />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    {requirements.upper ? (
                      <CheckCircleIcon color="success" sx={{ width: 20 }} />
                    ) : (
                      <CancelIcon color="error" sx={{ width: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 uppercase letter (A–Z)" />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    {requirements.lower ? (
                      <CheckCircleIcon color="success" sx={{ width: 20 }} />
                    ) : (
                      <CancelIcon color="error" sx={{ width: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 lowercase letter (a–z)" />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    {requirements.number ? (
                      <CheckCircleIcon color="success" sx={{ width: 20 }} />
                    ) : (
                      <CancelIcon color="error" sx={{ width: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 number (0–9)" />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    {requirements.special ? (
                      <CheckCircleIcon color="success" sx={{ width: 20 }} />
                    ) : (
                      <CancelIcon color="error" sx={{ width: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 special character (!@#$%^&*)" />
                </ListItem>
              </List>
            )}

            {/* Sign in button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ color: "#0A0F1E", py: 1.25, mb: 2 }}
              onClick={() =>
                navigate("/register-step-3", {
                  state: {
                    email: state?.email,
                    password: password,
                  },
                })
              }
              disabled={!isPasswordValid}
            >
              Continue
            </Button>

            {/* Create account */}
            <Typography variant="body2" sx={{ mt: 3 }}>
              Already have a PTC account?{" "}
              <Button
                size="small"
                sx={{ p: 0, minWidth: 0, color: "#A6FA12", fontWeight: 800 }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
