import { Box, Link } from "@mui/material";

export default function InfoBar() {
  return (
    <Box
      sx={{
        bgcolor: "#A6FA12",
        color: "#0A0F1E",
        py: 0.75,
        textAlign: "center",
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      Now you can use virtual IDE for free for one hour.{" "}
      <Link
        href="#"
        underline="hover"
        sx={{ fontWeight: 800, color: "#0A0F1E" }}
      >
        Learn More ▸
      </Link>
    </Box>
  );
}
