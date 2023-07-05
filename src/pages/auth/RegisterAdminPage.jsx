import React from "react";
import RegisterAdmin from "components/auth/register-admin/RegisterAdmin";
import AuthHeader from "components/auth/auth-header/AuthHeader";

const RegisterAdminPage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} />
      <RegisterAdmin />
    </>
  );
};

export default RegisterAdminPage;
