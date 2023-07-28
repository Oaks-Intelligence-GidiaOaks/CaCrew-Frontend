import React from "react";
import { DocumentUpload, AuthHeader } from "containers";

const CertificatePage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} link={"login"}/>
      <DocumentUpload
        title={"Upload Your Certificate of Incorporation"}
        documentName="certificate_of_incorporation"
        path={"/letter-document"}
      />
    </>
  );
};

export default CertificatePage;
