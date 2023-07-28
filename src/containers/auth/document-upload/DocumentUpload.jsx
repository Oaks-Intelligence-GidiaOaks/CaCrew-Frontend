import React, { useEffect, useRef, useState } from "react";
import "./DocumentUpload.scss";
import { Form } from "react-final-form";
import { Button } from "components";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import rtkMutation from "utils/rtkMutation";
import { useRegisterUserMutation } from "services/user.service";
import Upload from "components/widgets/upload/Upload";
import fileTypeReader, { stringTypeToFile } from "utils/fileTypeReader";
import { openModal } from "redux/slices/modal.slice";
// import axios from "axios";

const DocumentUpload = ({ title, documentName = "document", path = "" }) => {
  const [registerUser, { isLoading, error, isSuccess, isError }] =
    useRegisterUserMutation();

  const [uploadFile, setUploadFile] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const registerIsSuccessRef = useRef(isSuccess);
  const registerErroRef = useRef(error);
  const registerIsErroRef = useRef(isError);

  const state = useSelector((state) => state.formdata);
  const currentUrl = location.pathname;
  // console.log(state, "url");

  const handleSubmit = async (value) => {
    const file = value[documentName];
    // console.log(value, "rtkval");

    if (file) {
      const reader = new FileReader();
      const object = {};
      const object_dispatched = {};
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = file.name;
        object.type = file.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(file);
        // Setup object to be dispatched
        object_dispatched[documentName] = object;
        // console.log(object_dispatched.string, "disobj");
        dispatch(updateFormdata(object_dispatched));
        navigate(path);
      };
      // Check the file type and use different methods to read the file
      fileTypeReader(file, reader);
      if (currentUrl === "/letter-document") {
        await rtkMutation(registerUser, state);
        registerIsSuccessRef.current &&
          dispatch(
            openModal({
              title: "Registration Successful",
              message:
                "You have succesfully registered, verification is ongoing",
              success: true,
              promptMessage: "Done",
              promptLink: "/Login",
            })
          );
        registerIsErroRef.current &&
          dispatch(
            openModal({
              title: "Registration Failed",
              message: `${
                registerErroRef.current?.data?.message ||
                "Registration failed please try again"
              }`,
              promptMessage: "Review",
              promptLink: "/register-company",
            })
          );
      }
    }
  };

  // console.log(state[documentName], "rtk Final");

  // track rtk network status in a callback
  useEffect(() => {
    registerIsSuccessRef.current = isSuccess;
    registerErroRef.current = error;
    registerIsErroRef.current = isError;
  }, [isSuccess, error, isError]);

  // this populate the uploaded file value in redux state
  useEffect(() => {
    const fileObj = state[documentName];
    // console.log(fileObj?.string, "fileObj");
    // console.log(uploadFile, "string");

    const initialUploadObj = {};
    const uploadStringCovertFile =
      fileObj &&
      Object.keys(fileObj).length > 0 &&
      stringTypeToFile(fileObj.string, fileObj.type, fileObj.name);
    initialUploadObj[documentName] = uploadStringCovertFile || null;
    setUploadFile(initialUploadObj);
    // console.log(uploadFile, "string");
  }, [documentName, state]);

  return (
    <div className="upload_document center">
      <div className="upload_document_wrap">
        <div className="upload_document_title">{title}</div>
        <div className="upload_document_text">(Notarized Documents Only)</div>
        <Form
          onSubmit={handleSubmit}
          initialValues={uploadFile}
          render={({ handleSubmit, valid }) => (
            <form onSubmit={handleSubmit}>
              <Upload
                documentName={documentName}
                setUploadFile={setUploadFile}
              />
              <Button
                type={"Submit"}
                text={"Next"}
                className={"upload_document_btn"}
                disabled={!valid}
                loading={isLoading}
              />
            </form>
          )}
        />
      </div>
      <div className="admin_info_left_float"></div>
      <div className="admin_info_left_float_one"></div>
    </div>
  );
};

export default DocumentUpload;
