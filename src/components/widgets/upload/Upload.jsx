import React, { useState, useRef, useEffect } from "react";
import "./Upload.scss";
import { fileImg, filesImg, trash } from "assets/images";
import { Field, FormSpy, useForm } from "react-final-form";
import { required } from "validations/validations";

const Upload = ({
  documentName,
  isDelete = null,
  setIsDelete = null,
  multiple = false,
}) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});

  const fileRef = useRef(null);
  const form = useForm();

  const handleChange = (uploadedFiles) => {
    const newFiles = [];
    // Create a copy of the progress state
    const newProgress = { ...progress }; 

    uploadedFiles.forEach((file) => {
      newFiles.push(file);
      // Set initial progress to 0
      newProgress[file.name] = 0; 
    });

    setFiles(newFiles);
    setProgress(newProgress);

    uploadedFiles.forEach((file) => {
      // Simulate progress animation from 0 to 100
      const interval = setInterval(() => {
        setProgress((prevProgress) => ({
          ...prevProgress,
          // Increment by 2 for animation effect
          [file.name]: prevProgress[file.name] + 2, 
        }));
      }, 50);

      // Set progress to 100 after 1 second 
      setTimeout(() => {
        clearInterval(interval);
        setProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: 100,
        }));
      }, 1000);
    });
  };

  const handleDelete = (fileToDelete) => {
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[fileToDelete?.name];
      return newProgress;
    });

    form.change(documentName, updatedFiles);
  };

  useEffect(() => {
    if (isDelete) {
      handleDelete();
      setIsDelete(null);
    }
  }, [isDelete]);

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
                const uploadedFiles = Array.from(e.target.files);
                input.onChange([...input.value, ...uploadedFiles]);
                handleChange(uploadedFiles);
              }}
              multiple={multiple}
            />
            {meta.error && meta.touched && (
              <span className="input_error">{meta.error}</span>
            )}
          </div>
        )}
      />
      {/* <FormSpy
        subscription={{ values: true }}
        onChange={(props) => {
          const fileArray = props.values[documentName] || [];
          setFiles(fileArray);
        }}
      /> */}
      {files && files?.map((file) => (
        <div className="upload_progress_wrap start" key={file?.name}>
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
                  style={{ width: `${progress[file?.name]}%` }}
                ></div>
              </div>
              <img
                src={trash}
                alt="icon"
                className="upload_progress_trash"
                onClick={() => handleDelete(file)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Upload;
