import React from "react";
import RegisterAdmin from "components/auth/register-admin/RegisterAdmin";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const RegisterAdminScreen = () => {
  return (
    <>
      <DashboardHeader text={"Already have an account?"} buttonText={"Login"} />
      <RegisterAdmin />
    </>
  );
};

export default RegisterAdminScreen;
