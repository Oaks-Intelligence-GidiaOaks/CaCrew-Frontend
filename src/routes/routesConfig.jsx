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
  TRACK_PROJECT_OVERVIEW,
  MY_ACCOUNT,
  MESSAGE,
  NOTIFICATION,
  DOCUMENT_CENTER,
  TRANSACTION_DATABASE,
  REGISTRY,
  REGISTRY_DETAIL,
  LANDING,
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
  DashboardMessagePage,
  DashboardNotificationPage,
  RegistryPage,
  RegistryDetailPage,
  // super admin dasboard pages
  DashboardOrganisationPage,
  SupAdminDashHomePage,
  TrackProjectPage,
  ProjectTrackOverviewPage,
  MyAccountPage,
  TransactionDatabasePage,
  // organisation admin dasboard pages
  OrgAdminDashboardHomePage,
  // staff
  OrgStaffDashboardPage,
  LandingPage,
} from "pages";
import DocumentCenterPage from "pages/shared/DocumentCenterPage";

// Import dasboard pages

const RoutesConfig = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user, "log");
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path={HOME} element={<HomeScreen />} /> */}
      <Route path={LANDING} element={<LandingPage />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={REGISTER_COMPANY} element={<RegisterCompanyPage />} />
      <Route path={REGISTER_ADMIN} element={<RegisterAdminPage />} />
      <Route path={IDENTITY_DOCUMENT} element={<IdentityDocumentPage />} />
      <Route path={CERTIFICATE_DOCUMENT} element={<CertificatePage />} />
      <Route path={LETTER_AUTH_DOCUMENT} element={<LetterAuthPage />} />
      <Route path={REGISTRY} element={<RegistryPage />} />
      <Route path={REGISTRY_DETAIL} element={<RegistryDetailPage />} />
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
                ? OrgStaffDashboardPage
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
      <Route
        path={TRACK_PROJECT_OVERVIEW}
        element={<ProtectedRoute component={ProjectTrackOverviewPage} />}
      />
      <Route
        path={MY_ACCOUNT}
        element={<ProtectedRoute component={MyAccountPage} />}
      />
      <Route
        path={MESSAGE}
        element={<ProtectedRoute component={DashboardMessagePage} />}
      />
      <Route
        path={NOTIFICATION}
        element={<ProtectedRoute component={DashboardNotificationPage} />}
      />
      <Route
        path={DOCUMENT_CENTER}
        element={<ProtectedRoute component={DocumentCenterPage} />}
      />
      <Route
        path={TRANSACTION_DATABASE}
        element={<ProtectedRoute component={TransactionDatabasePage} />}
      />
    </Routes>
  );
};

export default RoutesConfig;
