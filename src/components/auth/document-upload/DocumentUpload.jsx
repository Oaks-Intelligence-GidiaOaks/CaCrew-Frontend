import React, { useState, useRef } from "react";
import "./DocumentUpload.scss";
import { Form, Field } from "react-final-form";
import { filesImg, fileImg, trash } from "assets/images";
import Button from "components/widgets/Button/Button";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import rtkQuery from "utils/rtkQuery";
import { useRegisterUserMutation } from "services/auth.service";
// import axios from "axios";

const DocumentUpload = ({ title, documentName = "document", path = "" }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const state = useSelector((state) => state.formdata);
  const currentUrl = location.pathname;
  console.log(currentUrl, "url");

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
      if (currentUrl === "/letter_document") {
        rtkQuery(registerUser, state)
        console.log(isLoading, error, "rtk Final");

      }
    }
  };

  // handle file change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = () => {
      setFile(() => selectedFile);
    };

    console.log(file);

    setProgress(0);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  };

  // handle file deletion
  const handleDelete = () => {
    fileRef.current.value = "";
    setFile(null);
    setProgress(0);
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
              <Field
                name={documentName}
                render={({ input }) => (
                  <div className="upload center col">
                    <div className="upload_image_wrap center">
                      <img src={fileImg} alt="icon" />
                    </div>
                    <div className="upload_text_bold">
                      Drag and drop files, or Browse
                    </div>
                    <div className="upload_text">
                      Support jpg, png, pdf, docx
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      className="uplaod_input"
                      onChange={(e) => {
                        input.onChange(e.target.files[0]);
                        handleChange(e);
                      }}
                    />
                  </div>
                )}
              />
              {file && (
                <div className="upload_progress_wrap start">
                  <img src={filesImg} alt="icon" />
                  <div className="upload_progress">
                    <div className="upload_progress_text">{file?.name}</div>
                    <div className="upload_progress_size">
                      {(file?.size / 1000).toFixed(2)} kb
                    </div>
                    <div className="upload_progress_inner_wrap center">
                      <div className="upload_progress">
                        <div
                          className="upload_progress_track"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <img
                        src={trash}
                        alt="icon"
                        className="upload_progress_trash"
                        onClick={handleDelete}
                      />
                    </div>
                  </div>
                </div>
              )}
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
