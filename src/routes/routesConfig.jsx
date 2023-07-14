import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/guards/ProtectedRoute";
import { useSelector } from "react-redux";
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
  WALLET,
  BUY_CARBON_CREDIT,
  TRACK_PROJECT,
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
  DashboardProjectPage,
  DashboardStaffPage,
  DashboardWalletPage,
  BuyCarbonCreditPage,
  // super admin dasboard pages
  DashboardOrganisationPage,
  SupAdminDashHomePage,
  // organisation admin dasboard pages
  OrgAdminDashboardHomePage,
  // staff
  StaffDashboardHomePage,
  TrackProjectPage,
} from "pages";

// Import dasboard pages

const RoutesConfig = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user, "log");
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
        element={
          <ProtectedRoute
            component={
              user?.role === "SuperAdmin"
                ? SupAdminDashHomePage
                : user?.role === "OrgAdmin"
                ? OrgAdminDashboardHomePage
                : user?.role === "Staff"
                ? StaffDashboardHomePage
                : LoginPage
            }
          />
        }
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
      <Route
        path={WALLET}
        element={<ProtectedRoute component={DashboardWalletPage} />}
      />
      <Route
        path={BUY_CARBON_CREDIT}
        element={<ProtectedRoute component={BuyCarbonCreditPage} />}
      />
      <Route
        path={TRACK_PROJECT}
        element={<ProtectedRoute component={TrackProjectPage} />}
      />
    </Routes>
  );
};

export default RoutesConfig;
