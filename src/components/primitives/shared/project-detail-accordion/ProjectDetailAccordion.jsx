import React, { useState } from "react";
import "./ProjectDetailAccordion.scss";
import { certificate, down, fileImg } from "assets/images";
import getFileDetails from "utils/getFileDetails";

const ProjectDetailAccordion = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { image: imageAuth, name: nameAuth } = getFileDetails(
    data?.letter_of_authorization_url
  );
  const { image: imageIdentity, name: nameIdentity } = getFileDetails(
    data?.admin_identity_document_url
  );
  const { image: imageProjDoc, name: nameProjDoc } = getFileDetails(
    data?.document_url
  );

  const handleAccordianClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="project_accordion">
      <div
        className={`${
          isExpanded
            ? "project_details_accordion_wrap_expand"
            : "project_details_accordion_wrap"
        }`}
        // style={{height: data?.progress === "Phase6" ? "530px" : "250px"}}
      >
        <div
          className="project_details_accordion_btn center"
          onClick={handleAccordianClick}
        >
          <div className="text project_details_accordion_btn_text">
            {isExpanded ? "Colapse" : "Expand"}
          </div>
          <img
            src={down}
            alt="icon"
            style={{ transform: isExpanded && "rotate(180deg)" }}
            className="project_details_accordion_btn_img"
          />
        </div>
        {data?.progress !== "Phase6" && (
          <div className="project_details_accordion_item_wrap">
            <div className="project_details_accordion_item">
              <span className="project_details_accordion_item_title">
                Project Design Document
              </span>
              <div className="project_details_accordion_item_value_wrap">
                <img
                  src={imageProjDoc || fileImg}
                  alt="icon"
                  className="project_details_accordion_item_img"
                />
                <div className="project_details_accordion_item_download">
                  <a
                    className="project_details_accordion_item_value_sm"
                    href={data?.letter_of_authorization_url}
                  >
                    {nameProjDoc || "Download"}
                  </a>
                  <span className="project_details_accordion_item_value_sm">
                    Download
                  </span>
                </div>
              </div>
            </div>
            <div className="project_details_accordion_item">
              <span className="project_details_accordion_item_title">
                Letter of Authorization
              </span>
              <div className="project_details_accordion_item_value_wrap">
                <img
                  src={imageProjDoc || fileImg}
                  alt="icon"
                  className="project_details_accordion_item_img"
                />
                <div className="project_details_accordion_item_download">
                  <a
                    className="project_details_accordion_item_value_sm"
                    href={data?.letter_of_authorization_url}
                  >
                    {nameProjDoc || "Download"}
                  </a>
                  <span className="project_details_accordion_item_value_sm">
                    Download
                  </span>
                </div>
              </div>
            </div>
            <div className="project_details_accordion_item">
              <span className="project_details_accordion_item_title">
                Identity Document
              </span>
              <div className="project_details_accordion_item_value_wrap">
                <img
                  src={imageProjDoc || fileImg}
                  alt="icon"
                  className="project_details_accordion_item_img"
                />
                <div className="project_details_accordion_item_download">
                  <a
                    className="project_details_accordion_item_value_sm"
                    href={data?.letter_of_authorization_url}
                  >
                    {nameProjDoc || "Download"}
                  </a>
                  <span className="project_details_accordion_item_value_sm">
                    Download
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {data?.progress === "Phase6" && (
          <div className="project_details_complete_wrap between">
            <div className="project_details_complete_info">
              <div className="text project_details_complete_info_text">
                Project Documentation
              </div>
              <div className="project_details_complete_item_wrap">
                <div className="project_details_accordion_item">
                  <span className="project_details_accordion_item_title">
                    Project Design Document
                  </span>
                  <div className="project_details_accordion_item_value_wrap">
                    <img
                      src={imageProjDoc || fileImg}
                      alt="icon"
                      className="project_details_accordion_item_img"
                    />
                    <div className="project_details_accordion_item_download">
                      <a
                        className="project_details_accordion_item_value_sm"
                        href={data?.letter_of_authorization_url}
                      >
                        {nameProjDoc || "Download"}
                      </a>
                      <span className="project_details_accordion_item_value_sm">
                        Download
                      </span>
                    </div>
                  </div>
                </div>
                <div className="project_details_accordion_item">
                  <span className="project_details_accordion_item_title">
                    Letter of Authorization
                  </span>
                  <div className="project_details_accordion_item_value_wrap">
                    <img
                      src={imageProjDoc || fileImg}
                      alt="icon"
                      className="project_details_accordion_item_img"
                    />
                    <div className="project_details_accordion_item_download">
                      <a
                        className="project_details_accordion_item_value_sm"
                        href={data?.letter_of_authorization_url}
                      >
                        {nameProjDoc || "Download"}
                      </a>
                      <span className="project_details_accordion_item_value_sm">
                        Download
                      </span>
                    </div>
                  </div>
                </div>
                <div className="project_details_accordion_item">
                  <span className="project_details_accordion_item_title">
                    Identity Document
                  </span>
                  <div className="project_details_accordion_item_value_wrap">
                    <img
                      src={imageProjDoc || fileImg}
                      alt="icon"
                      className="project_details_accordion_item_img"
                    />
                    <div className="project_details_accordion_item_download">
                      <a
                        className="project_details_accordion_item_value_sm"
                        href={data?.letter_of_authorization_url}
                      >
                        {nameProjDoc || "Download"}
                      </a>
                      <span className="project_details_accordion_item_value_sm">
                        Download
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="project_details_complete_cert">
              <div className="text project_details_complete_cert_text">
                Project Certificate
              </div>
              <img
                src={certificate}
                alt="certificate"
                className="project_details_complete_cert_img"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailAccordion;
