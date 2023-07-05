import React from "react";
import RegisterCompany from "components/auth/register-company/RegisterCompany";
import AuthHeader from "components/auth/auth-header/AuthHeader";

const RegisterCompanyPage = () => {
  return (
    <>
    <AuthHeader text={"Already have an account?"} buttonText={"Login"}/>
      <RegisterCompany />
    </>
  );
};

export default RegisterCompanyPage;
