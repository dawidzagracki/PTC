// routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainSite from "./MainPage";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterStep1Page";
import RegisterStep2Page from "./Pages/Register/RegisterStep2Page";
import RegisterStep3Page from "./Pages/Register/RegisterStep3Page";
import DashboardPage from "./DashboardPage";
import ModuleOverviewPage from "./ModuleOverviewPage";
import ModulePage from "./ModulePage";
import CertificationsPage from "./CertificationsPage";
import PathsPage from "./PathsPage";
import ModulesPage from "./ModulesPage";
import BusinessPage from "./BuisnessPage";
import PtcLabsPage from "./PtcLabsPage";
import FaqPage from "./FaqPage";
import LibraryPage from "./LibraryPage";
import EmailVerifyPage from "./EmailVerifyPage";
import WelcomePage from "./Pages/Register/WelcomePage";
import OnBoardingPage from "./Pages/Register/OnBoardingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-step-1" element={<RegisterPage />} />
      <Route path="/register-step-2" element={<RegisterStep2Page />} />
      <Route path="/register-step-3" element={<RegisterStep3Page />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/module-overview" element={<ModuleOverviewPage />} />
      <Route path="/module" element={<ModulePage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/paths" element={<PathsPage />} />
      <Route path="/modules" element={<ModulesPage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/ptc-labs" element={<PtcLabsPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/email-verify" element={<EmailVerifyPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/on-boarding" element={<OnBoardingPage />} />
      {/* 404 lub redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
