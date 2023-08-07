import React, { useEffect, useState } from "react";
import "./TableAccordion.scss";
import { down, fileImg } from "assets/images";
import { Button } from "components";
import { useVerifyOrganisationMutation } from "services/organisation.service";
import rtkMutation from "utils/rtkMutation";
import getFileDetails from "utils/getFileDetails";

const TableAccordion = ({ data, handleVerifyOrganisation }) => {
  const [isOpen, setIsopen] = useState(false);
  const handleOpen = () => {
    setIsopen(!isOpen);
  };
  const [verifyOrganisation, { isLoading, error, isSuccess }] =
    useVerifyOrganisationMutation({ invalidateTag: "Organisation" });

  const handleVerify = async (id) => {
    await rtkMutation(verifyOrganisation, id);
  };

  const {
    image: imageAuth,
    name: nameAuth,
  } = getFileDetails(data?.letter_of_authorization_url);
  const {
    image: imageIdentity,
    name: nameIdentity,
  } = getFileDetails(data?.admin_identity_document_url);
  const {
    image: imageIncoporation,
    name: nameIncoporation,
  } = getFileDetails(data?.certificate_of_incorporation_url);

  useEffect(() => {
    isSuccess && handleOpen();
  }, [isSuccess]);

  return (
    <div className={` ${isOpen ? "open_table_accordion" : "table_accordion"}`}>
      <div
        className={`table_accordion_values between ${
          isOpen && "open_table_accordion_bg"
        }`}
      >
        <div className="table_accordion_value">{data?.organization_name}</div>
        <div className="table_accordion_value">{data?.organization_email}</div>
        <div className="table_accordion_value">{data?.industry_type}</div>
        <div className="table_accordion_value">{data?.wallet_id}</div>
        <div
          className="table_accordion_value"
          style={{ width: "30px", cursor: "pointer", zIndex: "2" }}
          onClick={() => handleOpen()}
        >
          <img
            src={down}
            alt="icon"
            style={{ transform: isOpen && "rotate(180deg)" }}
          />
        </div>
      </div>
      <div className="table_accordion_items_top between">
        <div className="table_accordion_item_top">
          <span className="table_accordion_item_top_title">
            Date of Incorporation
          </span>
          <span className="table_accordion_item_top_value">
            {data?.date_of_incorporation}
          </span>
        </div>
        <div className="table_accordion_item_top">
          <span className="table_accordion_item_top_title">
            Company's Website
          </span>
          <a
            className="table_accordion_item_top_value"
            href="www.companyswebsite.com"
          >
            www.companyswebsite.com
          </a>
        </div>
        <div className="table_accordion_item_top">
          <span className="table_accordion_item_top_title">
            Originator’s Full Name
          </span>
          <span className="table_accordion_item_top_value">
            {data?.admin_name}
          </span>
        </div>
        <div className="table_accordion_item_top">
          <span className="table_accordion_item_top_title">
            Originator’s email
          </span>
          <a
            className="table_accordion_item_top_value"
            href="mailto:george.baskerville@email.com"
          >
            {data?.admin_email}
          </a>
        </div>
        <div style={{ width: "30px" }} />
      </div>
      <div className="table_accordion_items_bottom between">
        <div className="table_accordion_item_bottom">
          <span className="table_accordion_item_bottom_title">
            Originator’s Phone Number
          </span>
          <span className="table_accordion_item_bottom_value">
            12 January 1999
          </span>
        </div>
        <div className="table_accordion_item_bottom">
          <span className="table_accordion_item_bottom_title">
            Certificate of Incorporation
          </span>
          <div className="table_accordion_item_bottom_value_wrap">
            <img
              src={imageIncoporation || fileImg}
              alt="icon"
              className="table_accordion_item_bottom_img"
            />
            <div className="table_accordion_item_bottom_download">
              <a
                className="table_accordion_item_bottom_value_sm"
                href={data?.certificate_of_incorporation_url}
              >
                {nameIncoporation || "Download"}
              </a>
              <span className="table_accordion_item_bottom_value_sm">Download</span>
            </div>
          </div>
        </div>
        <div className="table_accordion_item_bottom">
          <span className="table_accordion_item_bottom_title">
            Identity Document
          </span>
          <div className="table_accordion_item_bottom_value_wrap">
            <img
              src={imageIdentity || fileImg}
              alt="icon"
              className="table_accordion_item_bottom_img"
            />
            <div className="table_accordion_item_bottom_download">
              <a
                className="table_accordion_item_bottom_value_sm"
                href={data?.admin_identity_document_url}
              >
               {nameIdentity || "Download"}
              </a>
              <span className="table_accordion_item_bottom_value_sm">Download</span>
            </div>
          </div>
        </div>
        <div className="table_accordion_item_bottom">
          <span className="table_accordion_item_bottom_title">
            Letter of Authorization
          </span>
          <div className="table_accordion_item_bottom_value_wrap">
            <img
              src={imageAuth || fileImg}
              alt="icon"
              className="table_accordion_item_bottom_img"
            />
            <div className="table_accordion_item_bottom_download">
              <a
                className="table_accordion_item_bottom_value_sm"
                href={data?.letter_of_authorization_url}
              >
                {nameAuth || "Download"}
              </a>
              <span className="table_accordion_item_bottom_value_sm">Download</span>
            </div>
          </div>
        </div>
        <div style={{ width: "30px" }} />
      </div>
      {!data?.isVerified && <div className="table_accordion_btn_wrap end">
        <Button
          text={"Verify"}
          className={"table_accordion_btn"}
          onClick={() => handleVerify(data?._id)}
          loading={isLoading}
        />
        <Button text={"Reject"} className={"table_accordion_btn_rej"} />
      </div>}
    </div>
  );
};

export default TableAccordion;
