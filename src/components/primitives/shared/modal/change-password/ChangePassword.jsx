import React, { useEffect, useRef, useState } from "react";
import "./ChangePassword.scss";
import { close } from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useUpdatePasswordMutation } from "services/user.service";
import rtkMutation from "utils/rtkMutation";
import { composeValidators, required, passwordMatch } from "validations/validations";
import { formatErrorResponse } from "utils/formatErrorResponse";

const ChangePassword = ({ data }) => {
  const [updatePassword, { error, isError, isSuccess, isLoading }] =
    useUpdatePasswordMutation();

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  // const handleCloseModal = () => {
  //   dispatch(closeComponentModal());
  // };

  const onSubmit = async (value) => {
    console.log(value, "vals");

    await rtkMutation(updatePassword, value);
  };

  useEffect(() => {
    isSuccess &&
      dispatch(
        openModal({
          title: "Password Updated Successfuly",
          message: `Password has updated successfuly, continue to dashboard`,
          success: true,
        })
      );

    isSuccess && dispatch(closeComponentModal());
    isError &&
      dispatch(
        openModal({
          title: "Password Updated Failed",
          message: `${
            formatErrorResponse(error) ||
            "An error occured please try again later"
          }`,
        })
      );
  }, [isSuccess, isError, error, dispatch]);

  //   console.log(projects, "s");

  return (
    <div className="change_pass_modal">
      <div className="change_pass_modal_title sub_heading">
        Welcome {user?.name}
      </div>
      {/* <img
        src={close}
        alt="icon"
        className="change_pass_modal_close"
        onClick={handleCloseModal}
      /> */}
      <div className="change_pass_modal_info_wrap ">
        <div className="change_pass_modal_info_bold">
          Change your password to continue to your dashboard
        </div>
      </div>
      <div className="change_pass_modal_input_warp">
        <div className="change_pass_modal_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="change_pass_modal_input_item"></div>
                <div className="change_pass_modal_input_item">
                  <Field
                    name="oldPassword"
                    component={Input}
                    label={"Old Password"}
                    password
                    validate={required("Old Password")}
                  />
                  <Field
                    name="password"
                    component={Input}
                    label={"Password"}
                    password
                    validate={required("Password")}
                  />
                  <Field
                    name="confirmPassword"
                    component={Input}
                    label={"Confirm Password"}
                    password
                    validate={composeValidators(
                      required("Confirm Password"),
                      passwordMatch
                    )}
                  />
                </div>

                <div className="change_pass_modal_input_btn_wrap end">
                  {/* <Button
                    text={"Cancel"}
                    className={"change_pass_modal_input_btn_two"}
                    onClick={handleCloseModal}
                  /> */}
                  <Button
                    text={"Update"}
                    className={"change_pass_modal_input_btn"}
                    type={"submit"}
                    loading={isLoading}
                    disabled={!valid}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
