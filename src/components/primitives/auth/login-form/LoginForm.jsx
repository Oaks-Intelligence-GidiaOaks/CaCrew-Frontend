import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import Button from "components/widgets/button/Button";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "services/user.service";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";

const LoginForm = () => {
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await rtkMutation(loginUser, values)
  };

  isSuccess && navigate("/");

  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Welcome Back</div>
            <div className="auth_form_sub_title">Log into your account</div>
            <div className="field">
              <Field name="email" component={Input} label={"Your work email"} />
            </div>
            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
              />
            </div>
            {/* <Link to={"/register_company"} className="auth_button_wrap"> */}
            {error && <div className="">{formatErrorResponse(error)}</div>}
            <Button
              type="submit"
              text={"Submit"}
              className="auth_button_wrap"
              loading={isLoading}
              style={{ marginBottom: "52px" }}
            />
            {/* </Link> */}
            <div className="auth_form_sub_title center">
              Don’t have an account yet?{" "}
              <Link
                to={"/register_company"}
                style={{ color: "#005AE3", marginLeft: "6px" }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
