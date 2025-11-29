import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "565156247152-9ov3d9ocqvbvrd8e6vbreqe4nrf2nidu.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <AppRoutes />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
