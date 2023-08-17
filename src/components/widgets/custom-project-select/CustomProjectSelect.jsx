import React, { useEffect, useState } from "react";
import "./CustomProjectSelect.scss";
import { down } from "assets/images";
import { ThreeDots } from "react-loader-spinner";
import {
  useUpdateProjectMutation,
  //   useAllProjectsQuery,
} from "services/project.service";
import rtkMutation from "utils/rtkMutation";

const CustomProjectSelect = ({ data, amount, isSuccessCredit }) => {
  // List of my custom select options
  const options = [
    {
      phase: (
        <div className="custom_proj_select_value_text">
          <span className="bold">Phase 2:</span> Validation
        </div>
      ),
      progress: "20%",
      value: "Phase2",
    },
    {
      phase: (
        <div className="custom_proj_select_value_text">
          <span className="bold">Phase 3:</span> Monitoring
        </div>
      ),
      progress: "40%",
      value: "Phase3",
    },
    {
      phase: (
        <div className="custom_proj_select_value_text">
          <span className="bold">Phase 4:</span> Reporting
        </div>
      ),
      progress: "60%",
      value: "Phase4",
    },
    {
      phase: (
        <div className="custom_proj_select_value_text">
          <span className="bold">Phase 5:</span> Verification
        </div>
      ),
      progress: "80%",
      value: "Phase5",
    },
    {
      phase: (
        <div className="custom_proj_select_value_text">
          <span className="bold">Phase 6:</span> Certification
        </div>
      ),
      progress: "100%",
      value: "Phase6",
    },
  ];

  // const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [updateProject, { isLoading, isError, error }] =
    useUpdateProjectMutation();

  const handleProjUpdate = (idx) => {
    rtkMutation(updateProject, {
      id: data?._id,
      body: {
        progress: options[idx]?.value,
        amount_earned: amount,
      },
    });
  };

  // update project with amount when carbon credit is succesful on parent component
  useEffect(() => {
    isSuccessCredit &&
      rtkMutation(updateProject, {
        id: data?._id,
        body: {
          progress: data?.progress,
          amount_earned: amount,
        },
      });
    // console.log(isSuccessCredit, "idxxxxxxxxxxxx");
  }, [isSuccessCredit]);

  // console.log(amount, "check***************");

  return (
    <div className="custom_proj_select">
      <div className="custom_proj_select_title">Update Progress of Project</div>
      <div
        className="custom_proj_select_item between"
        style={{ opacity: isLoading ? "0.3" : "1" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="custom_proj_select_value between">
          {options[data?.progress?.split("Phase")[1] - 2]?.phase || (
            <div className="custom_proj_select_value_text">
              <span className="bold">Phase 1:</span> New
            </div>
          )}
          <div className="custom_proj_select_value_text">
            {options[data?.progress?.split("Phase")[1] - 2]?.progress || "0%"}
          </div>
        </div>
        <div className="custom_proj_select_item_img">
          <img src={down} alt="icon" />
        </div>
      </div>
      <div
        className={` ${
          isOpen
            ? "custom_proj_select_options"
            : "custom_proj_select_options_close"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {options.map((item, idx) => (
          <div
            className="custom_proj_select_option"
            onClick={() => {
              handleProjUpdate(idx);
            }}
            key={item.value}
          >
            <div className="custom_proj_select_value between" key={item.value}>
              {item.phase}
              <div className="custom_proj_select_value_text">
                {item.progress}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="custom_proj_select_loading center">
          <ThreeDots
            height="15"
            width="15"
            radius="9"
            color="#4C5563"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default CustomProjectSelect;
