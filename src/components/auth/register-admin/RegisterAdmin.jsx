import React from "react";
import AdminInfoLeft from "components/primitives/admin-Info-left/AdminInfoLeft";
import RegisterAdminForm from "components/primitives/register-admin-form/RegisterAdminForm";

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
