import React from "react";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import Button from "components/widgets/button/Button";
import { useNavigate } from "react-router-dom";

const RegisterAdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.formdata);

  const onSubmit = (values) => {
    dispatch(updateFormdata(values));
    navigate("/identity-document");
    console.log(state, "form");
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <Field name="name" component={Input} label={"Full Name"} />
            </div>
            <div className="field">
              <Field name="email" component={Input} label={"Email Address"} />
            </div>
            <Field name="phone_number" component={Input} label={"Phone"} />

            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
              />
            </div>
            <div className="field">
              <Field
                name="confirm_password"
                component={Input}
                label={"Confirm Password"}
                password
              />
            </div>
            <Button
              type="submit"
              text={"Create Account"}
              className="auth_button_wrap"
            />
          </form>
        )}
      />
    </div>
  );
};

export default RegisterAdminForm;
