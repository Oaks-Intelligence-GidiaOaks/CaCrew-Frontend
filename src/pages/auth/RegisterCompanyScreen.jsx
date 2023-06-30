import React from "react";
import RegisterCompany from "components/auth/register-company/RegisterCompany";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const RegisterCompanyScreen = () => {
  return (
    <>
    <DashboardHeader text={"Already have an account?"} buttonText={"Login"}/>
      <RegisterCompany />
    </>
  );
};

export default RegisterCompanyScreen;
