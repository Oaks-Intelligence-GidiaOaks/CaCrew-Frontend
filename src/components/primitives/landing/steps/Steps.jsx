import React from "react";
import { StepsCard } from "components";
import {
  stepfive,
  stepfour,
  stepone,
  stepsix,
  stepthree,
  steptwo,
} from "assets/images";

const list = [
  { image: stepone, text: "Create a Project" },
  { image: steptwo, text: "Create a Project" },
  { image: stepthree, text: "Create a Project" },
  { image: stepfour, text: "Create a Project" },
  { image: stepfive, text: "Create a Project" },
  { image: stepsix, text: "Create a Project" },
];

const Steps = () => {
  return (
    <div className="steps">
      <div className="grad_text">
        Generate Carbon Credit on <span>Carbonible</span>
      </div>
      {list.map((item, idx) => (
        <div key={idx}>
          <StepsCard image={item.image} text={item.text}/>
        </div>
      ))}
    </div>
  );
};

export default Steps;
