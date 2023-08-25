import React from "react";
import "./Steps.scss";
import { Container, StepsCard } from "components";
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
  { image: steptwo, text: "Submit Project Docs" },
  { image: stepthree, text: "Assign Staff to Project" },
  { image: stepfour, text: "Real time update of project progress" },
  { image: stepfive, text: "Create a Project" },
  { image: stepsix, text: "Create a Project" },
];

const Steps = () => {
  return (
    <Container>
      <div className="steps">
        <div className="text_wrap">
          <div className="grad_text">
            Generate Carbon Credit on <br /> <span>Carbonible</span>
          </div>
          <div className="steps_text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy n
          </div>
        </div>
        {list.map((item, idx) => (
          <div key={idx}>
            <StepsCard image={item.image} text={item.text} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Steps;
