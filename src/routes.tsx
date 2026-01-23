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
import BasePathOverviewPage from "./BasePathOverviewPage";
import BaseModuleOverviewPage from "./Pages/MainSite/BaseModuleOverviewPage";
import PathOverviewPage from "./PathOverviewPage";
import CertificateOverviewPage from "./CertificateOverviewPage";
import BillingPage from "./BillingPage";
import AccountSettingsPage from "./AccountSettingsPage";
import BadgesPage from "./BadgesPage";
import InProgressPage from "./InProgressPage";
import ExamsPage from "./ExamsPage";
import CubesPage from "./CubesPage";
import ScrollToTop from "./Common/ScrollToTop";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-step-1" element={<RegisterPage />} />
      <Route path="/register-step-2" element={<RegisterStep2Page />} />
      <Route path="/register-step-3" element={<RegisterStep3Page />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/module-overview/:id" element={<ModuleOverviewPage />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/account-settings" element={<AccountSettingsPage />} />
      <Route path="/badges" element={<BadgesPage />} />
      <Route path="/test" element={<InProgressPage />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/cubes" element={<CubesPage />} />
      <Route
        path="/base-module-overview/:id"
        element={<BaseModuleOverviewPage />}
      />
      <Route
        path="/module/:moduleId/section/:sectionId"
        element={<ModulePage />}
      />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/paths" element={<PathsPage />} />
      <Route path="/modules" element={<ModulesPage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/ptc-labs" element={<PtcLabsPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/email-verify" element={<EmailVerifyPage />} />
      <Route path="/welcome/*" element={<WelcomePage />} />
      <Route path="/on-boarding" element={<OnBoardingPage />} />
      <Route path="/path/:id" element={<PathOverviewPage />} />
      <Route
        path="/certificate/:isMain/:id"
        element={<CertificateOverviewPage />}
      />
      <Route
        path="/path-overview/:pathName"
        element={<BasePathOverviewPage />}
      />
      {/* 404 lub redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}
