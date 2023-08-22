import React, { useEffect } from "react";
import "./DocumentList.scss";
import { dots, fileImg, filebg } from "assets/images";
import {
  useAllDocumentsQuery,
  useAddDocumentMutation,
} from "services/document.service";
import getFileDetails from "utils/getFileDetails";
import timeAgo from "utils/timeAgo";
import { Shimmer } from "components";

const DocumentList = () => {
  const { data } = useAllDocumentsQuery();
  // console.log(data, "data")
  // const data = null

  return (
    <div className="document_list_wrap center">
      <div className="document_list">
        {data && data?.length >= 1 ? (
          data?.map((item) => {
            const { image } = getFileDetails(item?.downloadUrl);
            return (
              <a key={item?.downloadUrl} href={item?.downloadUrl} className="document_list_item link">
                <img src={filebg} alt="" className="document_list_item_bg" />
                <div></div>
                <img
                  src={dots}
                  alt="dots"
                  className="document_list_item_optn"
                />
                <div className="document_list_item_file">
                  <div className="document_list_item_file_name">
                    {item?.name}
                  </div>
                  <div className="document_list_item_file_time">
                    {timeAgo(item?.timeCreated)}
                  </div>
                  <div className="document_list_item_file_img_wrap center">
                    <img
                      src={image || fileImg}
                      alt="type"
                      className="document_list_item_file_img"
                    />
                  </div>
                </div>
              </a>
            );
          })
        ) : data?.length < 1 ? (
          <div className="text">No documents</div>
        ) : (
          [1, 2, 3].map((_, idx) => (
            <div key={idx} className="document_shimmer">
              <Shimmer height={"200px"} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentList;
