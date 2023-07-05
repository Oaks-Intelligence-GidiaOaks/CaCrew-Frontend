import React from "react";
import { DocumentUpload, AuthHeader } from "containers";

const IdentityDocumentPage = () => {
  return (
    <>
      <AuthHeader text={"Already have an account?"} buttonText={"Login"} />
      <DocumentUpload
        title={"Upload Identity Document of Contact Person"}
        documentName="admin_identity_document"
        path={"/certificate-document"}
      />
    </>
  );
};

export default IdentityDocumentPage;
