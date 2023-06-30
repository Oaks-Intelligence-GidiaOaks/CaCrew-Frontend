import React from "react";
import DocumentUpload from "components/auth/document-upload/DocumentUpload";
import DashboardHeader from "components/dashboard/dashboard-header/DashboardHeader";

const LetterAuthScreen = () => {
  return (
    <>
      <DashboardHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Letter of Authorization"}
        documentName="letter_of_authorization"
      />
    </>
  );
};

export default LetterAuthScreen;
