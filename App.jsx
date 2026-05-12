import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import FraudPage from "./pages/FraudPage.jsx";
import FundFlowPage from "./pages/FundFlowPage.jsx";
import EntityMapPage from "./pages/EntityMapPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="fraud" element={<FraudPage />} />
        <Route path="fund-flow" element={<FundFlowPage />} />
        <Route path="entities" element={<EntityMapPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
