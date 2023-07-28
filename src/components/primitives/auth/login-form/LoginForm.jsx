import React, { useEffect } from "react";
import "./LoginForm.scss";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import { Button } from "components";
import { Link } from "react-router-dom";
import { useGetUserQuery, useLoginUserMutation } from "services/user.service";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";
import validate, {required} from "validations/validations";

const LoginForm = () => {
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });
  // useGetUserQuery(undefined, {skip: !isSuccess})

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await rtkMutation(loginUser, values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Welcome Back</div>
            <div className="auth_form_sub_title">Log into your account</div>
            <div className="field">
              <Field
                name="email"
                component={Input}
                label={"Your work email"}
                validate={required("Email")}
              />
            </div>
            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
                validate={required("Password")}
              />
            </div>
            {/* <Link to={"/register_company"} className="auth_button_wrap"> */}
            {error && <div className="input_error">{formatErrorResponse(error)}</div>}
            <Button
              type="submit"
              text={"Submit"}
              disabled={!valid}
              className="auth_button_wrap"
              loading={isLoading}
              style={{ marginBottom: "52px" }}
            />
            {/* </Link> */}
            <div className="auth_form_sub_title center">
              Don’t have an account yet?{" "}
              <Link
                to={"/register-company"}
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
