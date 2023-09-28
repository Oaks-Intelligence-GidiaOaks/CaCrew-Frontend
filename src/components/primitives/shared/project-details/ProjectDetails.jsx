import React, { useEffect } from "react";
import "./ProjectDetails.scss";
import {
  Button,
  ProjectDetailAccordion,
  Shimmer,
  TrackProjectProgress,
} from "components";
import { messge } from "assets/images";
import { convertDateToWord } from "utils/convertToDateFormat";
import { useSendMessageMutation } from "services/message.service";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { updateMessageId } from "redux/slices/message.slice";
import rtkMutation from "utils/rtkMutation";
import { useNavigate } from "react-router-dom";

const ProjectDetails = ({ data }) => {
  console.log(data, "proj");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    sendMessage,
    {
      isSuccess: isSuccessMessage,
      isLoading: isLoadingMessage,
      error: errorMessage,
      isError: isErrorMessage,
    },
  ] = useSendMessageMutation();

  const handleSendMessage = async (id) => {
    console.log(id, "*id");
    dispatch(updateMessageId({ message_id: null, chat_id: id }));
    await rtkMutation(sendMessage, { reciever: id, message: " " });
  };

  useEffect(() => {
    isErrorMessage &&
      dispatch(
        openModal({
          title: "Failed To Initiate Messaging",
          message: `${
            errorMessage?.data?.message || "An error occured, try agiain"
          }`,
        })
      );
    isSuccessMessage && navigate("/messages");
  }, [isSuccessMessage, isErrorMessage, errorMessage]);

  const showCertificate = (values) => {
    dispatch(
      openModal({
        component: "ProjectCertificate",
        data: values,
      })
    );
  };
  return (
    <>
      {data?.length >= 1 ? (
        <>
          {data?.map((item, idx) => (
            <div key={item?._id} className="project_details">
              <div className="project_details_title_wrap between">
                <div className="project_details_title">
                  <div className="text project_details_key">Project Title</div>
                  <div className="text project_details_value">
                    {item?.project_name}
                  </div>
                </div>
                {item?.progress === "Phase6" && (
                  <div className="project_details_title">
                    <Button
                      text={"View Certificate"}
                      className={"project_details_title_btn"}
                      onClick={() => showCertificate(item)}
                    />
                  </div>
                )}
              </div>
              <div className="project_details_info_wrap">
                <div className="project_details_info">
                  <div className="text project_details_key">
                    Carbon Credit Allocated to Project
                  </div>
                  <div className="text project_details_value">
                    {item?.amount_earned} tCO2e
                  </div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key">Project ID</div>
                  <div className="text project_details_value">{item?._id}</div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key">
                    Name of Originator
                  </div>
                  <div className="text project_details_value">
                    {item?.originator?.name}
                  </div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key">
                    Staff Assigned to Project
                  </div>
                  <div className="text project_details_value">
                    {" "}
                    {item?.originator?.name}
                  </div>
                </div>
                <div
                  className="project_details_info"
                  style={{ paddingRight: "15px" }}
                >
                  <div className="text project_details_key">
                    Progress: {item?.progress}
                  </div>
                  <div className="text project_details_value">
                    <TrackProjectProgress phase={item?.progress} />
                  </div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key">Start Date</div>
                  <div className="text project_details_value">
                    {convertDateToWord(item?.createdAt)}
                  </div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key">End Date</div>
                  <div className="text project_details_value">
                    {item?.progress === "Phase6" ? "27 June 2023" : "Ongoing"}
                  </div>
                </div>
                <div className="project_details_info">
                  <div className="text project_details_key"></div>
                  <div
                    className="make_payment_details_message_seller start"
                    onClick={() => handleSendMessage(item?.originator?._id)}
                  >
                    <img src={messge} alt="icon" />
                    <span>
                      {isLoadingMessage ? "Initiating..." : "Message Assignee"}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <ProjectDetailAccordion data={item} />
            </div>
          ))}
        </>
      ) : data?.length < 1 ? (
        <div className="text center">No data yet</div>
      ) : (
        <div className="mt_10">
          {Array.from({ length: 3 }, (_, idx) => (
            <div className="mb_10" key={idx}>
              <Shimmer height={"200px"} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
