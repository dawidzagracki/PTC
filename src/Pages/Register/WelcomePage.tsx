import { Box, Typography } from "@mui/material";

export default function WelcomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0C111B",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 4,
      }}
    >
      {/* Logo placeholder */}
      <Typography
        sx={{
          color: "#A6FA12",
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "0.1em",
        }}
      >
        HACKTHEBOX
      </Typography>

      {/* Welcome */}
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          color: "#E6F1FF",
          opacity: 0.8,
        }}
      >
        Welcome,
      </Typography>

      {/* Username */}
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        TESTTESTTTTEST
      </Typography>
    </Box>
  );
}
