import React from "react";
import { AuthHeader, RegisterCompany } from "containers";

const RegisterCompanyPage = () => {
  return (
    <>
    <AuthHeader text={"Already have an account?"} buttonText={"Login"}/>
      <RegisterCompany />
    </>
  );
};

export default RegisterCompanyPage;
