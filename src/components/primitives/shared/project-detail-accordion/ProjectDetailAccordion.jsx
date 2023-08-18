import React, { useState } from "react";
import "./ProjectDetailAccordion.scss";
import { certificate, down, fileImg } from "assets/images";
import getFileDetails from "utils/getFileDetails";

const ProjectDetailAccordion = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordianClick = () => {
    setIsExpanded(!isExpanded);
  };
  // console.log(data, "dt");
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
        <div className="text project_details_desc">
          <div className="project_details_desc_head">Description</div>
          <div>{data?.description}</div>
        </div>
        {data?.progress !== "Phase6" && (
          <>
            <div className="text project_details_desc">
              <div className="project_details_desc_head">Project Documents</div>
            </div>
            <div className="project_details_accordion_item_wrap">
              {data?.document_urls?.map((item) => {
                const { image, name } = getFileDetails(item);
                const cleanedName = name.replace("%2F", "");

                return (
                  <div className="project_details_accordion_item">
                    <div className="project_details_accordion_item_value_wrap">
                      <img
                        src={image || name}
                        alt="icon"
                        className="project_details_accordion_item_img"
                      />
                      <div className="project_details_accordion_item_download">
                        <a
                          className="project_details_accordion_item_value_sm"
                          href={data?.letter_of_authorization_url}
                        >
                          {cleanedName || "Download"}
                        </a>
                        <span className="project_details_accordion_item_value_sm">
                          Download
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {data?.progress === "Phase6" && (
          <>
            <div className="text project_details_desc">
              <div className="project_details_desc_head">Project Documents</div>
            </div>
            <div className="project_details_complete_wrap between">
              <div className="project_details_complete_info">
                <div className="project_details_complete_item_wrap">
                  {data?.document_urls?.map((item) => {
                    const { image, name } = getFileDetails(item);
                    const cleanedName = name.replace("%2F", "");
                    return (
                      <div className="project_details_accordion_item">
                        <div className="project_details_accordion_item_value_wrap">
                          <img
                            src={image || name}
                            alt="icon"
                            className="project_details_accordion_item_img"
                          />
                          <div className="project_details_accordion_item_download">
                            <a
                              className="project_details_accordion_item_value_sm"
                              href={data?.letter_of_authorization_url}
                            >
                              {cleanedName || "Download"}
                            </a>
                            <span className="project_details_accordion_item_value_sm">
                              Download
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailAccordion;
