import React from "react";
import "./WhatWeOffer.scss";
import {
  sphereeight,
  spherefive,
  spherefour,
  sphereone,
  sphereseven,
  spheresix,
  spherethree,
  spheretwo,
} from "assets/images";
import { Container } from "components";

const WhatWeOffer = () => {
  return (
    <div className="we_offer">
      <Container>
        <div className="between we_offer_wrap">
          <div className="we_offer_text_wrap">
            <div className="we_offer_title">
              Buy, Sell and Retire Carbon Credits
            </div>
            <div className="we_offer_text">
              We offer an extensive portfolio of certified carbon credits from
              reputable and verified projects Worldwide.
            </div>
          </div>
          <div className="we_offer_img_wrap center">
            <div className="we_offer_imges">
              {Array(9)
                .fill(1)
                .map((_, idx) => (
                  <img src={sphereone} alt="sphere" style={{animationDelay: `${idx * 1}s`}} className="sphereone"/>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhatWeOffer;
