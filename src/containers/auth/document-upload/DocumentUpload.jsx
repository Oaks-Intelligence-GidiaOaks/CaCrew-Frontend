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
import fileTypeReader, { createFileFromData } from "utils/fileTypeReader";
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
        dispatch(updateFormdata(object_dispatched));
        navigate(path);
      };
      // Check the file type and use different methods to read the file
      fileTypeReader(file, reader);
      if (currentUrl === "/letter-document") {
        await rtkMutation(registerUser, state);
        registerIsSuccessRef &&
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
        registerIsErroRef &&
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

  useEffect(() => {
    registerIsSuccessRef.current = isSuccess;
    registerErroRef.current = error;
    registerIsErroRef.current = isError;

    const fileObj = state[documentName];
    const initialUploadObj = {};
    const uploadStringCovertFile =
      Object.keys(fileObj).length > 0 &&
      createFileFromData(fileObj.string, fileObj.name, fileObj.type);
    initialUploadObj[documentName] = uploadStringCovertFile;
    setUploadFile(initialUploadObj);
  }, [isSuccess, error, isError, state, documentName]);

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
              <Upload documentName={documentName} />
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
