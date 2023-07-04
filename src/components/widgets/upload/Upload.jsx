import React, { useState, useRef } from "react";
import "./Upload.scss"
import { fileImg, filesImg, trash } from "assets/images";
import { Field } from "react-final-form";


const Upload = ({ documentName }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const fileRef = useRef(null);

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
    <div>
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
            <div className="upload_text">Support jpg, png, pdf, docx</div>
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
    </div>
  );
};

export default Upload;
