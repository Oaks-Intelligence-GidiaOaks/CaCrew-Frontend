import React from "react";
import DocumentUpload from "components/auth/document-upload/DocumentUpload";
import AuthHeader from "components/auth/auth-header/AuthHeader";

const CertificatePage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Your Certificate of Incorporation"}
        documentName="certificate_of_incorporation"
        path={"/letter-document"}
      />
    </>
  );
};

export default CertificatePage;
