import React from "react";
import "./WhatWeDo.scss";
import { Container, TextList } from "components";

const WhatWeDo = ({ image, background, list, heading, buttonBg }) => {
  return (
    <Container>
      <div className="what_we_do between">
        <div className="what_we_do_img">
          <img
            src={image}
            alt="example"
            style={{ background: `${background}` }}
            className="img"
          />
        </div>
        <div className="what_we_do_list">
          <TextList list={list} heading={heading} buttonBg={buttonBg} />
        </div>
      </div>
    </Container>
  );
};

export default WhatWeDo;
