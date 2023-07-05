import React from "react";
import { RegisterAdminForm, AdminInfoLeft } from "components";

const RegisterAdmin = () => {
  return (
    <div className="auth center">
      <div className="auth_left">
        <AdminInfoLeft />
      </div>
      <div className="auth_right center">
        <RegisterAdminForm />
      </div>
    </div>
  );
};

export default RegisterAdmin;
