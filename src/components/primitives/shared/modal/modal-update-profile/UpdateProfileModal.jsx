import React, { useEffect, useState } from "react";
import "./UpdateProfileModal.scss";
import "../modal-component-sell-order/ModalSellOrder.scss";
import { avartar, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { required } from "validations/validations";
import { useGetUserQuery, useUpdateUserMutation } from "services/user.service";
import fileTypeReader from "utils/fileTypeReader";
import rtkMutation from "utils/rtkMutation";
import { formatErrorResponse } from "utils/formatErrorResponse";

const UpdateProfileModal = () => {
  const [initialValue, setInitialValues] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);

  const [updateUser, { isSuccess, isLoading, isError, error }] =
    useUpdateUserMutation();

  const dispatch = useDispatch();

  const { data } = useGetUserQuery();
  // console.log(data, "dtt");

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    console.log(values);

    if (imageFile) {
      const reader = new FileReader();
      let object = {};
      // let uploadObj = {};
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = imageFile.name;
        object.type = imageFile.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(imageFile);
        // Replace form value with object
        // uploadObj["document"] = object;
        values["photo_url"] = object;
      };
      await rtkMutation(updateUser, values);
      fileTypeReader(imageFile, reader);
    }
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        name: data?.name,
        email: data?.email,
        phone_number: data?.phone_number,
      });
      setImage(data?.photo_url);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      dispatch(
        openModal({
          title: "Update Profile Failed",
          message: `${
            formatErrorResponse(error) || "An error occured please try again"
          }`,
        })
      );
    }
    if (isSuccess) {
      dispatch(
        openModal({
          title: "Update Profile Success",
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
      <div className="profile_info_wrap center col">
        <div className="profile_info_bold">
          <img
            src={image || avartar}
            alt="avartar"
            className="profile_input_img"
          />
        </div>
        <div className="text profile_input_wrap">
          <span className="profile_input_text">Change Avatar</span>
          <input
            // ref={fileRef}
            type="file"
            className="profile_input"
            accept="image/jpeg,image/png"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
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

export default UpdateProfileModal;
