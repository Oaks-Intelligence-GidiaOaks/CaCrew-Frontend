import React, { useState } from "react";
import "./DashboardStaff.scss";
import Button from "components/widgets/button/Button";
import { close, search } from "assets/images";
import { DashboardStaffCard } from "components";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import { useAllStaffsQuery, useAddStaffMutation } from "services/staff.service";
import { useGetUserQuery } from "services/user.service";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";

const DashboardStaff = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: staffs } = useAllStaffsQuery();
  const [
    addStaff,
    { isLoading: loadingAddStaff, error },
  ] = useAddStaffMutation();

  const { data: userData } = useGetUserQuery();
  //   console.log(staffs, error, "staff");


  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  //   isSuccess && navigate("/dashboard_staff");

  const onSubmit = async (values) => {
    await rtkMutation(addStaff, values).then(() => {
      setIsOpen(!isOpen);
    });
    console.log(values, "Created");
  };
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
                {staffs?.length || "--" }
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
              <input
                className="dashboard_staff_banner_input"
                placeholder="Search"
              />
              <img
                src={search}
                alt="icon"
                className="dashboard_staff_banner_img"
              />
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
                      options={
                        { "Admin User": "OrgAdmin", "Staff": "Staff" }
                      }
                    />
                  </div>
                  {error && <div>{formatErrorResponse(error)}</div>}
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
      <div className="dashboard_staff_wrap">
        {staffs && staffs?.map((data) => <DashboardStaffCard data={data} />)}
      </div>
    </>
  );
};

export default DashboardStaff;
