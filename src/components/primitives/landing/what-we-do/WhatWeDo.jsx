import React from "react";
import "./WhatWeDo.scss";
import { Container, TextList } from "components";
import ScrollEffect from "components/animation/ScrollEfect";

const WhatWeDo = ({ image, background, list, heading, buttonBg, reverse }) => {
  return (
    <Container>
      <div id="about" className={`what_we_do between ${reverse && "reverse"}`}>
        <div className="what_we_do_img">
          <ScrollEffect
            properties={{
              scale: [1, 1.1, 1.2, 1.3, 1.2, 1.1, 1],
            }}
            // inViewDelay={1.2}
            inViewTransitionTime={2}
          >
            <img
              src={image}
              alt="example"
              style={{ background: `${background}` }}
              className="img"
            />
          </ScrollEffect>
        </div>
        <div className="what_we_do_list">
          <TextList list={list} heading={heading} buttonBg={buttonBg} />
        </div>
      </div>
    </Container>
  );
};

export default WhatWeDo;
