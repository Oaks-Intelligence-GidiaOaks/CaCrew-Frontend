import React, { useEffect, useState } from "react";
import "./DashboardStaff.scss";
import { Button, Input } from "components";
import { close, search } from "assets/images";
import { DashboardStaffCard, SearchInput } from "components";
import { Form, Field } from "react-final-form";
import { useAllStaffsQuery, useAddStaffMutation } from "services/staff.service";
import { useGetUserQuery } from "services/user.service";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";

const DashboardStaff = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: staffs } = useAllStaffsQuery();
  const [
    addStaff,
    {
      isLoading: loadingAddStaff,
      error: errorAddStaff,
      isError: isErrorAddStaff,
      isSuccess: isSuccessAddStaff,
    },
  ] = useAddStaffMutation();

  const { data: userData } = useGetUserQuery();

  const dispatch = useDispatch();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (values) => {
    await rtkMutation(addStaff, values).then(() => {
      setIsOpen(!isOpen);
    });
    console.log(values, "Created");
  };

  useEffect(() => {
    isSuccessAddStaff &&
      dispatch(
        openModal({
          title: "Staff Created Successful",
          message: `You have succesfuly created a staff`,
          success: true,
        })
      );
    isErrorAddStaff &&
      dispatch(
        openModal({
          title: "Staff Creation Failed",
          message: `${
            formatErrorResponse(errorAddStaff) ||
            "An error has occured, please try again later"
          }`,
        })
      );
  }, [errorAddStaff, isErrorAddStaff, isSuccessAddStaff]);
  return (
    <>
      {" "}
      <div className="dashboard_staff">
        <div className="dashboard_staff_banner_wrap between">
          <div className="dashboard_staff_banner_text_wrap start">
            <div className="dashboard_staff_banner_text_staff">
              <div className="dashboard_staff_banner_text_staff_title">
                Staff
              </div>
              <div className="dashboard_staff_banner_text_staff_total">
                Total Staff
              </div>
              <div className="dashboard_staff_banner_text_staff_value">
                {staffs?.length || "--"}
              </div>
            </div>
            <div className="dashboard_staff_banner_text_org">
              <div className="dashboard_staff_banner_text_org_title">
                Organization
              </div>
              <div className="dashboard_staff_banner_text_org_value">
                {userData?.organization_id?.organization_name || "--"}
              </div>
            </div>
          </div>
          <div className="dashboard_staff_banner_inputbtn_wrap start">
            <div className="dashboard_staff_banner_input_wrap">
              <SearchInput />
            </div>
            <Button
              // type={"submit"}
              text={"Add Staff"}
              className={"dashboard_staff_banner_btn"}
              onClick={handleIsOpen}
            />
          </div>
        </div>
        <div
          className={`dashboard_staff_form_modal center col ${
            !isOpen && "dashboard_staff_form_modal_close"
          }`}
        >
          <div className="dashboard_staff_form_modal_wrap">
            <div
              className="end"
              style={{ cursor: "pointer" }}
              onClick={handleIsOpen}
            >
              <img src={close} alt="icon" />
            </div>

            <div className="dashboard_staff_form_modal_title">
              Add New Staff
            </div>

            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="dashboard_staff_form_modal_field">
                    <Field component={Input} name="name" label="Name" />
                  </div>
                  <div className="dashboard_staff_form_modal_field">
                    <Field component={Input} name="email" label="Email" />
                  </div>
                  <div className="dashboard_staff_form_modal_field">
                    <Field
                      component={Input}
                      name="phone_number"
                      label="Phone number"
                    />
                  </div>
                  <div className="dashboard_staff_form_modal_field">
                    <Field
                      component={Input}
                      name="designation"
                      label="Designation"
                    />
                  </div>
                  <div
                    className="dashboard_staff_form_modal_field"
                    style={{ marginBottom: "70px" }}
                  >
                    <Field
                      component={Input}
                      name="role"
                      label="Staff Level"
                      select
                      options={{ "Admin User": "OrgAdmin", Staff: "Staff" }}
                    />
                  </div>
                  <Button
                    text={"Add"}
                    type={"submit"}
                    loading={loadingAddStaff}
                  />
                </form>
              )}
            />
          </div>
        </div>
      </div>
      <div className="dashboard_staff_wrap dash_pad">
        {staffs &&
          staffs?.map((data) => (
            <div key={data?._id}>
              <DashboardStaffCard data={data} />
            </div>
          ))}
      </div>
    </>
  );
};

export default DashboardStaff;
