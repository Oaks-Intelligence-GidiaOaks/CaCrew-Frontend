import React from "react";
import { DocumentUpload, AuthHeader } from "containers";

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
