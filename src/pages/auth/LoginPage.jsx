import React from "react";
import { Login, AuthHeader } from "containers";

const LoginPage = () => {
  return (
    <>
      <AuthHeader text={"Don’t have an account?"} buttonText={"SignUp"} />
      <Login />
    </>
  );
};

export default LoginPage;
