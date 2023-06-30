import { Routes, Route } from "react-router-dom";

// Import contants
import {
  // HOME,
  LOGIN,
  REGISTER_COMPANY,
  REGISTER_ADMIN,
  IDENTITY_DOCUMENT,
  CERTIFICATE_DOCUMENT,
  LETTER_AUTH_DOCUMENT,
} from "routes/constants";

// Import auth pages
// import HomeScreen from "pages/auth/HomeScreen";
import LoginScreen from "pages/auth/LoginScreen";
import RegisterCompanyScreen from "pages/auth/RegisterCompanyScreen";
import RegisterAdminScreen from "pages/auth/RegisterAdminScreen";
import IdentityDocumentScreen from "pages/auth/IdentityDocumentScreen";
import CertificateScreen from "pages/auth/CertificateScreen";
import LetterAuthScreen from "pages/auth/LetterAuthScreen";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path={HOME} element={<HomeScreen />} /> */}
      <Route path={LOGIN} element={<LoginScreen />} />
      <Route path={REGISTER_COMPANY} element={<RegisterCompanyScreen />} />
      <Route path={REGISTER_ADMIN} element={<RegisterAdminScreen />} />
      <Route path={IDENTITY_DOCUMENT} element={<IdentityDocumentScreen />} />
      <Route path={CERTIFICATE_DOCUMENT} element={<CertificateScreen />} />
      <Route path={LETTER_AUTH_DOCUMENT} element={<LetterAuthScreen />} />
      {/* Protected Routes */}
    </Routes>
  );
};

export default RoutesConfig;
