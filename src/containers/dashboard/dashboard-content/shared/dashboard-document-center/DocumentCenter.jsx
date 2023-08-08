import React, { useEffect } from "react";
import "./DocumentCenter.scss";
import { Button, DocumentCenterBanner, DocumentList, Upload } from "components";
import { Form } from "react-final-form";
import { useAddDocumentMutation } from "services/document.service";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import rtkMutation from "utils/rtkMutation";
import fileTypeReader from "utils/fileTypeReader";

const DocumentCenter = () => {
  const [addDocument, { isLoading, isSuccess, isError, error }] =
    useAddDocumentMutation();
  console.log(isSuccess, "docs");
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    const file = value.document;
    if (file) {
      const reader = new FileReader();
      let object = {};
      let uploadObj = {};
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = file.name;
        object.type = file.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(file);
        // Replace form value with object
        uploadObj["document"] = object;
        rtkMutation(addDocument, uploadObj);
      };
      fileTypeReader(file, reader);
    }
  };
  useEffect(() => {
    if (isError) {
      dispatch(
        openModal({
          title: "Document Upload Failed",
          message: `${
            error?.data?.message || "An error occured please try again"
          }`,
        })
      );
    }
    if (isSuccess) {
      dispatch(
        openModal({
          title: "Document Upload Successful",
          message: "Your document has successfully been uploades",
          success: true,
        })
      );
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="document_center ">
      <DocumentCenterBanner />
      <div className="dash_pad">
        <div className="document_center_heading">Recent Uploads</div>
        <DocumentList />
      </div>
      <div className="dash_pad">
        <div className="document_center_heading">Recent Uploads</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, valid }) => (
            <form onSubmit={handleSubmit}>
              <Upload documentName={"document"} />
              <div className="center">
                <Button
                  type={"submit"}
                  text={"Upload"}
                  disabled={!valid}
                  className={"document_center_btn"}
                  loading={isLoading}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default DocumentCenter;
