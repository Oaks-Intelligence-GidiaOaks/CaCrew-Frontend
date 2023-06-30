import React from "react";
import DocumentUpload from "components/auth/document-upload/DocumentUpload";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const CertificateScreen = () => {
  return (
    <>
      <DashboardHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Your Certificate of Incorporation"}
        documentName="certificate_of_incorporation"
        path={"/letter_document"}
      />
    </>
  );
};

export default CertificateScreen;
