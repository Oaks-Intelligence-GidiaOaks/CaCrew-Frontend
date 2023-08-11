import React, { useEffect, useState } from "react";
import "./UpdateProfileModal.scss";
import "../modal-component-sell-order/ModalSellOrder.scss";
import { avartar, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { required } from "validations/validations";
import { useGetUserQuery } from "services/user.service";

const UpdateProfileModal = () => {
  const [initialValue, setInitialValues] = useState({});

  const dispatch = useDispatch();

  const { data } = useGetUserQuery();
  console.log(data, "dtt");
  console.log(initialValue, "dtts");

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        name: data?.name,
        email: data?.email,
        phone_number: data?.phone_number,
      });
    }
  }, [data]);

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
      <div className="profile_info_wrap center col">
        <div className="profile_info_bold">
          <img src={avartar} alt="avartar" className="profile_input_img" />
        </div>
        <div className="text profile_input_wrap">
          <span className="profile_input_text">Change Avatar</span>
          <input
            // ref={fileRef}
            type="file"
            className="profile_input"
            accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // onChange={(e) => {
            //   input.onChange(e.target.files[0]);
            //   // handleChange(e);
            // }}
          />
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
                    name="name"
                    placeholder="Enter Account Name"
                    label="Account Name"
                    component={Input}
                    validate={required("Account Name")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    component={Input}
                    validate={required("Enter Email")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="phone_number"
                    placeholder="Enter Phone"
                    label="Phone"
                    component={Input}
                    validate={required("Enter Phone")}
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

export default UpdateProfileModal;
