import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/AuthService";

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

export default function RegisterStep3Page() {
  const navigate = useNavigate();

  const countries = [
    { code: "PL", name: "Poland" },
    { code: "DE", name: "Germany" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "EG", name: "Egypt" },
    { code: "FR", name: "France" },
    { code: "ES", name: "Spain" },
    { code: "IT", name: "Italy" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "FI", name: "Finland" },
    { code: "DK", name: "Denmark" },
    { code: "CZ", name: "Czech Republic" },
    { code: "SK", name: "Slovakia" },
    { code: "HU", name: "Hungary" },
    { code: "RO", name: "Romania" },
    { code: "BG", name: "Bulgaria" },
    { code: "UA", name: "Ukraine" },
    { code: "RU", name: "Russia" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "CA", name: "Canada" },
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
  ];

  const getFlagEmoji = (countryCode: string) =>
    countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0)),
      );

  const { state } = useLocation();
  const [username, setUsername] = useState<string>("");
  const [email] = useState<string>(state?.email);
  const [password] = useState<string>(state?.password);
  const [firstCheckbox, setFirstCheckbox] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  function areFormsValid() {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return (
      usernameRegex.test(username) &&
      fullName.length > 0 &&
      country !== "" &&
      firstCheckbox
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);
    // setLoading(true);

    const data = await AuthService.register({
      email: email,
      password: password,
      userName: username,
      fullName: fullName,
      country: country,
    });

    if (data) {
      console.log("Registered & logged in:", data);
      if (data.isEmailConfirmed) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("accessTokenExpiresAt", data.expiresAt);
        localStorage.setItem("email", data.email);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("username", data.userName);
        navigate("/dashboard");
      } else {
        navigate("/email-verify", { state: { email: email } });
      }
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
          pt: "5%",
        }}
      >
        <img src={logo} width={110} />
      </Container>
      <Box
        sx={{
          minHeight: "62vh",
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

            {/* Username */}
            <TextField
              fullWidth
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              sx={{ mb: 2 }}
            />

            {/* Full Name */}
            <TextField
              fullWidth
              type="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              autoComplete="fullname"
              sx={{ mb: 2 }}
            />

            {/* Country Select */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value as string)}
                displayEmpty
                defaultValue=""
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300, // NEW
                    },
                  },
                }}
                sx={{
                  backgroundColor: "#0F1529",
                  borderRadius: 2,
                  color: "#E6F1FF",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.08)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.16)",
                  },
                }}
                renderValue={(value) => {
                  if (!value)
                    return <span style={{ opacity: 0.6 }}>Select Country</span>;

                  const selected = countries.find((c) => c.code === value);

                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span style={{ fontSize: "1.3rem", paddingBottom: 4.5 }}>
                        {getFlagEmoji(selected!.code)}
                      </span>
                      {selected!.name}
                    </Box>
                  );
                }}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {" "}
                    {/* NEW – value = code, nie name */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {" "}
                      {/* NEW */}
                      <span style={{ fontSize: "1.2rem", paddingBottom: 4.5 }}>
                        {getFlagEmoji(c.code)}
                      </span>{" "}
                      {/* NEW */}
                      <span>{c.name}</span> {/* zamiast surowego tekstu */}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Checkbox: age confirmation */}
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setFirstCheckbox(!firstCheckbox)}
                  value={firstCheckbox}
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    "&.Mui-checked": {
                      color: "#A6FA12", // neon green
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  I confirm that I am 18 years or older and agree to the{" "}
                  <Link sx={{ color: "#A6FA12", fontWeight: 600 }}>
                    User Agreement
                  </Link>{" "}
                  and the{" "}
                  <Link sx={{ color: "#A6FA12", fontWeight: 600 }}>
                    Privacy Notice
                  </Link>
                </Typography>
              }
            />

            {/* Checkbox: product updates */}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "rgba(255,255,255,0.3)",
                    "&.Mui-checked": {
                      color: "#A6FA12",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I wish to receive e-mails regarding product updates
                </Typography>
              }
            />

            {/* Sign in button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ color: "#0A0F1E", py: 1.25, mb: 2, mt: 2 }}
              disabled={!areFormsValid()}
              onClick={(e) => handleSubmit(e)}
            >
              Create account
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
