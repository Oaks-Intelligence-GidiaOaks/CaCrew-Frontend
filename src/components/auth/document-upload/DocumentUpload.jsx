import React from "react";
import "./DocumentUpload.scss";
import { Form } from "react-final-form";
import Button from "components/widgets/Button/Button";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import rtkMutation from "utils/rtkMutation";
import { useRegisterUserMutation } from "services/user.service";
import Upload from "components/widgets/upload/Upload";
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
        // Get array buffer result from file
        const fileDataBuffer = reader.result;
        // Initialize a decoder to decode buffer object into string
        const decoder = new TextDecoder("UTF-8");
        // Add properties to object
        object.name = file.name;
        object.type = file.type;
        object.buffer = decoder.decode(fileDataBuffer);
        object.path = URL.createObjectURL(file);
        // Replace form value with object
        value[documentName] = object;
        // console.log(value, "name");
        dispatch(updateFormdata(value));
        navigate(path);
      };
      reader.readAsArrayBuffer(file);
      if (currentUrl === "/letter-document") {
        rtkMutation(registerUser, state)
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
              <Upload documentName={documentName}/>
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
