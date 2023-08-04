import React from "react";
import "./DocumentUpload.scss";
import { Form } from "react-final-form";
import { Button, Upload } from "components";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import rtkMutation from "utils/rtkMutation";
import { useRegisterUserMutation } from "services/user.service";
import fileTypeReader from "utils/fileTypeReader";
// import axios from "axios";

const DocumentUpload = ({ title, documentName = "document", path = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const state = useSelector((state) => state.formdata);
  const currentUrl = location.pathname;
  console.log(state, "url");

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
      fileTypeReader(file, reader)
      if (currentUrl === "/letter-document") {
        rtkMutation(registerUser, state);
        console.log(isLoading, error, "rtk Final");
      }
    }
  };

  return (
    <div className="upload_document center">
      <div className="upload_document_wrap">
        <div className="upload_document_title">{title}</div>
        <div className="upload_document_text">(Notarized Documents Only)</div>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Upload documentName={documentName} />
              <Button
                type={"Submit"}
                text={"Next"}
                className={"upload_document_btn"}
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
