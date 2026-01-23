import * as React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { AuthService } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#101927", paper: "#1a2332" },
    primary: { main: "#A6FA12" },
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const result = await AuthService.googleLogin(tokenResponse.access_token);
      if (result) {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("accessTokenExpiresAt", result.expiresAt);
        localStorage.setItem("email", result.email);
        localStorage.setItem("fullName", result.fullName);
        localStorage.setItem("username", result.userName);
        navigate(result.isOnBoarded ? "/dashboard" : "/welcome");
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await AuthService.login({
      email: email,
      password: password,
    });

    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("accessTokenExpiresAt", data.expiresAt);
      localStorage.setItem("email", data.email);
      localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("username", data.userName);
      navigate("/dashboard", { state: { data: data } });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          justifyContent: "center",
          display: "flex",
          alignContent: "center",
          pt: "4%",
        }}
      >
        <img src={logo} width={110} />
      </Container>
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "background.default",
          display: "grid",
          placeItems: "center",
          pb: 8,
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
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
              Sign in to Path The Code
            </Typography>

            {/* Email */}
            <TextField
              fullWidth
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Password */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
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

            {/* Sign in button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ color: "#0A0F1E", py: 1.25, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ my: 2 }}
            >
              <Divider
                sx={{ flex: 1, borderColor: "rgba(255,255,255,0.12)" }}
              />
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
              <Divider
                sx={{ flex: 1, borderColor: "rgba(255,255,255,0.12)" }}
              />
            </Stack>

            {/* Social buttons (no brand logos; neutral icons) */}
            <Stack spacing={1.25}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.55)",
                  borderRadius: 1,
                  color: "white",
                }}
                onClick={() => googleLogin()}
              >
                Sign in with Google
              </Button>
            </Stack>

            {/* Create account */}
            <Typography variant="body2" sx={{ mt: 3 }}>
              New to Path The Code?{" "}
              <Button
                size="small"
                sx={{ p: 0, minWidth: 0, color: "#A6FA12", fontWeight: 800 }}
                onClick={() => navigate("/register-step-1")}
              >
                Create Account
              </Button>
            </Typography>

            {/* Footer fine print */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 6, textAlign: "center" }}
            >
              © 2017–2025 — This site is protected by reCAPTCHA. All Rights
              Reserved.{" "}
              <Button
                size="small"
                sx={{
                  color: "text.secondary",
                  textDecoration: "underline",
                  minWidth: 0,
                  p: 0,
                }}
              >
                User Agreement
              </Button>{" "}
              ·{" "}
              <Button
                size="small"
                sx={{
                  color: "text.secondary",
                  textDecoration: "underline",
                  minWidth: 0,
                  p: 0,
                }}
              >
                Privacy Notice
              </Button>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
