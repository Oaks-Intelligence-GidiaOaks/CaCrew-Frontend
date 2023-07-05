import React from "react";
import Login from "components/auth/login/Login";
import AuthHeader from "components/auth/auth-header/AuthHeader";

const LoginPage = () => {
  return (
    <>
      <AuthHeader text={"Don’t have an account?"} buttonText={"SignUp"} />
      <Login />
    </>
  );
};

export default LoginPage;
