import React from "react";
import AuthLeftSide from "components/primitives/auth-left-side/AuthLeftSide";
import RegisterCompanyForm from "components/primitives/register-company-form/RegisterCompanyForm";

const RegisterCompany = () => {
  return (
    <div className="auth center">
      <div className="auth_left">
        <AuthLeftSide />
      </div>
      <div className="auth_right center">
        <RegisterCompanyForm />
      </div>
    </div>
  );
};

export default RegisterCompany;
