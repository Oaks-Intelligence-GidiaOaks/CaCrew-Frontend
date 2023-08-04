import React from "react";
import "./DocumentCenterBanner.scss";
import { SearchInput } from "components";

const DocumentCenterBanner = () => {
  return (
    <div className="doc_center_banner between">
      <div className="doc_center_banner_heading sub_heading">Document Centre</div>
      <div className="doc_center_banner_srch">
        <SearchInput />
      </div>
    </div>
  );
};

export default DocumentCenterBanner;
