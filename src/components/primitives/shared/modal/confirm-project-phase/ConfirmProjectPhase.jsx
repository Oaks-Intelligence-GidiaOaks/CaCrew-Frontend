import React, { useEffect } from "react";
import "./ConfirmProjectPhase.scss";
import { close } from "assets/images";
import { Button } from "components";
import { useDispatch } from "react-redux";
import { useUpdateProjectMutation } from "services/project.service";
import rtkMutation from "utils/rtkMutation";
import { closeComponentModal } from "redux/slices/modal.slice";
import { openModal } from "redux/slices/modal.slice";
import { formatErrorResponse } from "utils/formatErrorResponse";

const ConfirmProjectPhase = ({ data }) => {
  const dispatch = useDispatch();
  const [updateProject, { isLoading, isError, error, isSuccess }] =
    useUpdateProjectMutation();

  const handleProjUpdate = () => {
    rtkMutation(updateProject, {
      id: data?.id,
      body: {
        progress: data?.progress,
        amount_earned: data?.amount,
      },
    });
  };

  const handleModalClose = () => {
    dispatch(closeComponentModal());
  };

//   console.log(data?.progress[data?.progress?.length - 1], "len")

  useEffect(() => {
    isSuccess &&
      dispatch(
        openModal({
          title: "Project Phase Change Successful",
          message: "Project phase has successfuly been updated",
          success: true,
        })
      );

    isSuccess && dispatch(closeComponentModal());
    isError &&
      dispatch(
        openModal({
          title: "Project Phase Change Failed",
          message: `${
            formatErrorResponse(error) ||
            "An error occured please try again later"
          }`,
        })
      );
  }, [isSuccess, isError, error, dispatch]);
  return (
    <div className="confirm_proj_phase">
      <img
        src={close}
        alt="icon"
        className="confirm_proj_phase_img"
        onClick={handleModalClose}
      />
      <div className="confirm_proj_phase_heading sub_heading">
        Move To Next Phase
      </div>
      <div className="confirm_proj_phase_text">
        {"This action would move " +
          data?.name +
          " project to Phase " +
          data?.progress[data?.progress?.length - 1]}
      </div>
      <div className="confirm_proj_phase_btn_wrap end">
        <Button
          text={"Cancel"}
          className={"confirm_proj_phase_btn_one"}
          onClick={handleModalClose}
        />
        <Button
          text={"Confirm"}
          className={"confirm_proj_phase_btn_two"}
          onClick={handleProjUpdate}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default ConfirmProjectPhase;
