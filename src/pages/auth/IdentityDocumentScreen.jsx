import React from "react";
import DocumentUpload from "components/auth/document-upload/DocumentUpload";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const IdentityDocumentScreen = () => {
  return (
    <>
      <DashboardHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Identity Document of Contact Person"}
        documentName="admin_identity_document"
        path={"/certificate_document"}
      />
    </>
  );
};

export default IdentityDocumentScreen;
