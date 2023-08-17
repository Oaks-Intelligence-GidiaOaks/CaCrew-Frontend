import React from "react";
import "./ConfirmProjectPhase.scss";
import { close } from "assets/images";
import { Button } from "components";

const ConfirmProjectPhase = () => {
  return <div className="confirm_proj_phase">
    <img src={close} alt="icon" />
    <div className="confirm_proj_phase_heading sub_heading">
        Move To Next Phase
    </div>
    <div className="confirm_proj_phase_btn_wrap">
        <Button text={"Cancel"}/>
        <Button text={"Confirm"}/>
    </div>
  </div>;
};

export default ConfirmProjectPhase;
