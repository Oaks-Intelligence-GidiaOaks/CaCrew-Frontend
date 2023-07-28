import React from "react";
import { AuthHeader, RegisterCompany } from "containers";

const RegisterCompanyPage = () => {
  return (
    <>
    <AuthHeader text={"Already have an account?"} buttonText={"Login"} link={"/login"}/>
      <RegisterCompany />
    </>
  );
};

export default RegisterCompanyPage;
