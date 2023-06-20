import React from "react";
import "./LoginForm.scss";
import { Form, Field } from "react-final-form";
import Input from "components/primitives/input/Input";
import Button from "components/widgets/Button/Button";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Welcome Back</div>
            <div className="auth_form_sub_title">Log into your account</div>
            <div className="field">
              <Field name="email" component={Input} label={"Your work email"} />
            </div>
            <div className="field">
              <Field name="password" component={Input} label={"Password"} password/>
            </div>
            <Link to={"/register_company"} className="auth_button_wrap">
              <Button type="submit" text={"Submit"} />
            </Link>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
