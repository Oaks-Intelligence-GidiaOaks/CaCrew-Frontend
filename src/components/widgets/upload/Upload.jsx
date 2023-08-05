import React, { useState, useRef, useEffect } from "react";
import "./Upload.scss";
import { fileImg, filesImg, trash } from "assets/images";
import { Field, FormSpy, useForm } from "react-final-form";
import { required } from "validations/validations";

const Upload = ({ documentName }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const fileRef = useRef(null);
  const form = useForm();

  // handle file change
  const handleChange = () => {
    setProgress(0);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  };

  // console.log(fileRef, "fileref");

  // handle file deletion
  const handleDelete = () => {
    fileRef.current.value = "";
    setFile(null);
    setProgress(0);
    form.reset();
  };
  // useEffect(() => {
  //   // setProgress(0);
  //   setTimeout(() => {
  //     setProgress(100);
  //   }, 1000);
  //   return () => {
  //     setProgress(0);
  //   };
  // }, [file]);
  return (
    <div>
      <Field
        name={documentName}
        validate={required(`${documentName}`)}
        render={({ input, meta }) => (
          <div className="upload center col">
            <div className="upload_image_wrap center">
              <img src={fileImg} alt="icon" />
            </div>
            <div className="upload_text_bold">
              Drag and drop files, or Browse
            </div>
            <div className="upload_text">Support jpg, png, pdf, docx</div>
            <input
              ref={fileRef}
              type="file"
              className="uplaod_input"
              accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => {
                input.onChange(e.target.files[0]);
                // handleChange(e);
              }}
            />
            {meta.error && meta.touched && (
              <span className="input_error">{meta.error}</span>
            )}
          </div>
        )}
      />
      <FormSpy
        subscription={{ values: true }}
        onChange={(props) => {
          const file = props.values;
          // console.log(file[documentName], "file");
          setFile(file[documentName]);
          handleChange();
        }}
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
    </div>
  );
};

export default Upload;
