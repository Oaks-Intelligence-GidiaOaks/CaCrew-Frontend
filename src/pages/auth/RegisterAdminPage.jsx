import React from "react";
import { AuthHeader, RegisterAdmin } from "containers";

const RegisterAdminPage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} />
      <RegisterAdmin />
    </>
  );
};

export default RegisterAdminPage;
