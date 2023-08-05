import React, { useEffect, useState, useRef, useCallback } from "react";
import "./DocumentUpload.scss";
import { Form } from "react-final-form";
import { Button, Upload } from "components";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import rtkMutation from "utils/rtkMutation";
import { useRegisterUserMutation } from "services/user.service";
import fileTypeReader from "utils/fileTypeReader";
import { openModal } from "redux/slices/modal.slice";
import { clearFormData } from "redux/slices/register.slice";
// import axios from "axios";

const DocumentUpload = ({ title, documentName = "document", path = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFile, setIsFile] = useState(false);

  const [registerUser, { isLoading, error, isSuccess, isError }] =
    useRegisterUserMutation();
  const state = useSelector((state) => state.formdata);
  const stateRef = useRef(state);
  const currentUrl = location.pathname;
  // console.log(formData, "url");
  console.log(stateRef.current, "url");

  const handleSubmit = (value) => {
    const file = value[documentName];
    if (file) {
      const reader = new FileReader();
      const object = {};
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = file.name;
        object.type = file.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(file);
        // Replace form value with object
        value[documentName] = object;
        // console.log(value, "name");
        dispatch(updateFormdata(value));
        navigate(path);
      };
      // Check the file type and use different methods to read the file
      fileTypeReader(file, reader);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openModal({
          title: "Registration Successful",
          message: "You have succesfully registered, verification is ongoing",
          success: true,
          promptMessage: "Done",
          promptLink: "/Login",
        })
      );
      dispatch(clearFormData());
      setIsFile(false);
    }
    if (isError) {
      dispatch(
        openModal({
          title: "Registration Failed",
          message: `${
            error?.data?.message || "Registration failed please try again"
          }`,
          promptMessage: "Review",
          promptLink: "/register-company",
        })
      );
      // dispatch(clearFormData());
      setIsFile(false);
    }
  }, [isError, error, isSuccess]);

  useEffect(() => {
    const request = async () => {
      if (currentUrl === "/letter-document" && isFile) {
        await rtkMutation(registerUser, state);
        setIsFile(false);
        // alert("aha")
      }
    };
    request();
    return () => {
      setIsFile(false);
    };
  }, [state]);

  return (
    <div className="upload_document center">
      <div className="upload_document_wrap">
        <div className="upload_document_title">{title}</div>
        <div className="upload_document_text">(Notarized Documents Only)</div>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, valid }) => (
            <form onSubmit={handleSubmit}>
              <Upload documentName={documentName} setIsFile={setIsFile} />
              <Button
                type={"Submit"}
                text={"Next"}
                className={"upload_document_btn"}
                loading={isLoading}
                disabled={!valid}
                onClick={setIsFile(valid)}
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
