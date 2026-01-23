import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthService } from "../../Services/AuthService";
import GoogleIcon from "@mui/icons-material/Google";

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

export default function RegisterStep1Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          justifyContent: "center",
          display: "flex",
          alignContent: "center",
          pt: "5.5%",
        }}
      >
        <img src={logo} width={110} />
      </Container>
      <Box
        sx={{
          minHeight: "65vh",
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

            {/* Email */}
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              sx={{ mb: 2 }}
            />

            {/* Sign in button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ color: "#0A0F1E", py: 1.25, mb: 2 }}
              onClick={() =>
                navigate("/register-step-2", {
                  state: {
                    email: email,
                  },
                })
              }
              disabled={!isEmailValid}
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
              Already have a PTC account?{" "}
              <Button
                size="small"
                sx={{ p: 0, minWidth: 0, color: "#A6FA12", fontWeight: 800 }}
                onClick={() => navigate("/login")}
              >
                Sign In
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
