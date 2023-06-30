import React from "react";
import Login from "components/auth/login/Login";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const LoginScreen = () => {
  return (
    <>
      <DashboardHeader text={"Don’t have an account?"} buttonText={"SignUp"} />
      <Login />
    </>
  );
};

export default LoginScreen;
