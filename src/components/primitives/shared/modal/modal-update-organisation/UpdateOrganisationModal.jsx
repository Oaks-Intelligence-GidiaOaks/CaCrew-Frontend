import React, { useEffect, useState } from "react";
import "./UpdateOrganisationModal.scss";
import "../modal-component-sell-order/ModalSellOrder.scss";
import { avartar, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { required } from "validations/validations";
import { useGetUserQuery } from "services/user.service";
import { useUpdateOrganisationMutation } from "services/organisation.service";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";

const UpdateOrganisationModal = () => {
  const [initialValue, setInitialValues] = useState({});

  const [updateOrganisation, { isSuccess, isLoading, isError, error }] =
    useUpdateOrganisationMutation();
  const { data } = useGetUserQuery();
  console.log(data, "dtt");

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(updateOrganisation, values);
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        organization_email: data?.organization_id?.organization_email,
        account_name: data?.organization_id?.account_name,
        account_number: data?.organization_id?.account_number,
        account_type: data?.organization_id?.account_type,
        bank: data?.organization_id?.bank,
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      dispatch(
        openModal({
          title: "Update Organization Failed",
          message: `${
            formatErrorResponse(error) || "An error occured please try again"
          }`,
        })
      );
    }
    if (isSuccess) {
      dispatch(
        openModal({
          title: "Update Organization Success",
          message: `${"Profile updated succesfully"}`,
          success: true,
        })
      );
    }
  }, [isError, isSuccess, error, dispatch]);

  //   console.log(isErrorRef.current, "**", error);
  return (
    <div className="profile">
      <div className="profile_title sub_heading">Edit profile</div>
      <img
        src={close}
        alt="icon"
        className="profile_close"
        onClick={handleCloseModal}
      />
      <div className="profile_info_wrap ">
        <div className="profile_info_bold">
          Input the Banking Details of your Organization
        </div>
      </div>
      <div className="profile_input_warp">
        <div className="profile_input">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValue}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="profile_input_item">
                  <Field
                    name="organization_email"
                    placeholder="Enter Email"
                    label="Email"
                    component={Input}
                    validate={required("Enter Email")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="account_name"
                    placeholder="Enter Account Name"
                    label="Account Name"
                    component={Input}
                    validate={required("Account Name")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="account_number"
                    placeholder="Enter Account Number"
                    label="Account Number"
                    component={Input}
                    validate={required("Account Number")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="account_type"
                    placeholder="Enter Account Type"
                    label="Account Type"
                    component={Input}
                    validate={required("Account Type")}
                    select
                    options={{Savings: "Savings", Current: "Current" }}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="bank"
                    placeholder="Enter Bank"
                    label="Bank"
                    component={Input}
                    validate={required("Bank")}
                  />
                </div>
                <div className="profile_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"profile_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Update"}
                    className={"profile_input_btn"}
                    type={"submit"}
                    disabled={!valid}
                    loading={isLoading}
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

export default UpdateOrganisationModal;
