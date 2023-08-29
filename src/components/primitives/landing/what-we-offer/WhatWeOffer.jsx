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
import ScrollEffect from "components/animation/ScrollEfect";

const WhatWeOffer = () => {
  return (
    <div className="we_offer">
      <Container>
        <div className="between we_offer_wrap">
          <div className="we_offer_text_wrap">
            <ScrollEffect
              inViewProperties={{
                y: [20, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.5}
              className="we_offer_title"
            >
              Buy, Sell and Retire Carbon Credits
            </ScrollEffect>
            <ScrollEffect
              inViewProperties={{
                y: [20, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.4}
              inViewTransitionTime={0.5}
              className="we_offer_text"
            >
              We offer an extensive portfolio of certified carbon credits from
              reputable and verified projects Worldwide.
            </ScrollEffect>
          </div>
          <div className="we_offer_img_wrap center">
            <ScrollEffect
              inViewProperties={{
                scale: [0.7, 1],
                opacity: [0, 1],
              }}
              inViewDelay={0.8}
              inViewTransitionTime={0.5}
            >
              <div className="we_offer_imges">
                {Array(9)
                  .fill(1)
                  .map((_, idx) => (
                    <img
                      src={sphereone}
                      alt="sphere"
                      style={{ animationDelay: `${idx * 1}s` }}
                      className="sphereone"
                    />
                  ))}
              </div>
            </ScrollEffect>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhatWeOffer;
