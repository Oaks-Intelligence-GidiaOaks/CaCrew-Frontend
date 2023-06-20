import { Routes, Route } from "react-router-dom";


// Import contants
import { HOME, LOGIN, REGISTER_COMPANY, REGISTER_ADMIN } from "routes/constants";

// Import auth pages
import HomeScreen from "pages/auth/HomeScreen";
import LoginScreen from "pages/auth/LoginScreen";
import  RegisterCompanyScreen  from "pages/auth/RegisterCompanyScreen";
import RegisterAdminScreen from "pages/auth/RegisterAdminScreen";


const RoutesConfig = () => {
  return (
    <Routes>
        {/* Public Routes */}
            <Route path={HOME} element={<HomeScreen />} />
            <Route path={LOGIN} element={<LoginScreen />} />
            <Route path={REGISTER_COMPANY} element={<RegisterCompanyScreen />} />
            <Route path={REGISTER_ADMIN} element={<RegisterAdminScreen />} />
        {/* Protected Routes */}

    </Routes>
  )
}

export default RoutesConfig