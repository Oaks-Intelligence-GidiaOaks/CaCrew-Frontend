import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/guards/ProtectedRoute";

// Import contants
import {
  // HOME,
  LOGIN,
  REGISTER_COMPANY,
  REGISTER_ADMIN,
  IDENTITY_DOCUMENT,
  CERTIFICATE_DOCUMENT,
  LETTER_AUTH_DOCUMENT,
  DASHBOARD,
  ORGANISATION,
  PROJECT,
  STAFF,
} from "routes/constants";

// Import auth pages

import {
  // auth pages
  LoginPage,
  RegisterCompanyPage,
  RegisterAdminPage,
  IdentityDocumentPage,
  CertificatePage,
  LetterAuthPage,
  // shared dasboard pages
  DashboardOrganisationPage,
  DashboardProjectPage,
  DashboardStaffPage,
} from "pages";

// Import dasboard pages
import DashScreen from "pages/org-admin-dashboard/OrgAdminDashHomePage";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path={HOME} element={<HomeScreen />} /> */}
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={REGISTER_COMPANY} element={<RegisterCompanyPage />} />
      <Route path={REGISTER_ADMIN} element={<RegisterAdminPage />} />
      <Route path={IDENTITY_DOCUMENT} element={<IdentityDocumentPage />} />
      <Route path={CERTIFICATE_DOCUMENT} element={<CertificatePage />} />
      <Route path={LETTER_AUTH_DOCUMENT} element={<LetterAuthPage />} />
      {/* <Route path={DASHBOARD} element={<DashScreen />} /> */}

      {/* Protected Routes */}
      <Route
        path={DASHBOARD}
        element={<ProtectedRoute component={DashScreen} />}
      />
      <Route
        path={ORGANISATION}
        element={<ProtectedRoute component={DashboardOrganisationPage} />}
      />
      <Route
        path={PROJECT}
        element={<ProtectedRoute component={DashboardProjectPage} />}
      />
      <Route
        path={STAFF}
        element={<ProtectedRoute component={DashboardStaffPage} />}
      />
    </Routes>
  );
};

export default RoutesConfig;
