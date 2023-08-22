import React, { useEffect, useRef, useState } from "react";
import "./ChangePassword.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useUpdatePasswordMutation } from "services/user.service";
import rtkMutation from "utils/rtkMutation";
import { required } from "validations/validations";
import { formatErrorResponse } from "utils/formatErrorResponse";

const ChangePassword = ({ data }) => {
  const [assignProjectHandler, { error, isError, isSuccess, isLoading }] =
    useUpdatePasswordMutation();

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (value) => {
    console.log(value, "vals");

    await rtkMutation(assignProjectHandler, value);
  };

  useEffect(() => {
    isSuccess &&
      dispatch(
        openModal({
          title: "Project Assigned Successfuly",
          message: `Project has successfuly been assigned to ${data?.name}`,
          success: true,
        })
      );

    isSuccess && dispatch(closeComponentModal());
    isError &&
      dispatch(
        openModal({
          title: "Project Assigning Failed",
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
      <div className="change_pass_modal_title sub_heading">Change Password</div>
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
                    validate={required("Old Password")}
                  />
                  <Field
                    name="password"
                    component={Input}
                    label={"Password"}
                    validate={required("Password")}
                  />
                  <Field
                    name="confirmPassword"
                    component={Input}
                    label={"Confirm Password"}
                    validate={required("Confirm Password")}
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
