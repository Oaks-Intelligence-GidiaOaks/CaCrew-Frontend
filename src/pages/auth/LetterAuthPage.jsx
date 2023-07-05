import React from "react";
import DocumentUpload from "components/auth/document-upload/DocumentUpload";
import AuthHeader from "components/auth/auth-header/AuthHeader";

const LetterAuthPage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Letter of Authorization"}
        documentName="letter_of_authorization"
      />
    </>
  );
};

export default LetterAuthPage;
