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
import ScrollEffect from "components/animation/ScrollEfect";

const list = [
  { image: stepone, text: "Create a Project" },
  { image: steptwo, text: "Submit Project Docs" },
  { image: stepthree, text: "Assign Staff to Project" },
  { image: stepfour, text: "Real time update of project progress" },
  { image: stepfive, text: "Carbon Credit Approved" },
  { image: stepsix, text: "Carbon Credit Certificate" },
];

const Steps = () => {
  return (
    <Container>
      <div className="steps">
        <div className="text_wrap">
          <ScrollEffect
            inViewProperties={{
              y: [20, 0],
              opacity: [0, 1],
            }}
            inViewDelay={0.2}
            inViewTransitionTime={0.5}
            className="grad_text"
          >
            Generate Carbon Credit on <br /> <span>Carbonible</span>
          </ScrollEffect>
          {/* <div className="steps_text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy n
          </div> */}
        </div>
        {list.map((item, idx) => (
          <ScrollEffect
            inViewProperties={{
              x: [20, 0],
              opacity: [0, 1],
            }}
            inViewDelay={(idx + 1) * 0.3}
            inViewTransitionTime={0.5}
          >
            <div key={idx}>
              <StepsCard image={item.image} text={item.text} />
            </div>
          </ScrollEffect>
        ))}
      </div>
    </Container>
  );
};

export default Steps;
