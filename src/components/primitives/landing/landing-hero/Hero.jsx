import React from "react";
import "./Hero.scss";
import { Button, Container } from "components";
import { adjust, dash, demo, escrow, gidia, inv, oaks } from "assets/images";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import ScrollEffect from "components/animation/ScrollEfect";

const Hero = () => {
  return (
    <div className="hero">
      <Container>
        <div className="hero_wrap between">
          <div className="hero_text_wrap">
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
              className="hero_text_heading"
            >
              Buy, Sell and Retire Carbon Credits
            </ScrollEffect>
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.8}
              inViewTransitionTime={0.8}
            >
              <div className="hero_text">
                We offer an extensive portfolio of certified carbon credits from
                reputable and verified projects Worldwide.
              </div>
            </ScrollEffect>
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={1.2}
              inViewTransitionTime={0.7}
            >
              <div className="hero_text_wrap_btn start">
                <Link
                  to={"/register-company"}
                  className="link"
                  style={{ marginRight: "10px" }}
                >
                  <Button text={"Get Started"} className={"hero_text_btn"} />
                </Link>
                <Button text={"Learn More"} className={"hero_text_btn_two"} />
              </div>
            </ScrollEffect>
          </div>
          <ScrollEffect
            inViewProperties={{
              opacity: [0, 1],
            }}
            inViewDelay={1.6}
            inViewTransitionTime={0.8}
            className="hero_img_wrap_anim"
          >
            <div className="hero_img_wrap center">
              <img src={demo || dash} alt="demo" className="hero_img" />
            </div>
          </ScrollEffect>
        </div>
        <ScrollEffect
          inViewProperties={{
            opacity: [0, 1],
          }}
          inViewDelay={1.8}
          inViewTransitionTime={0.8}
          className="hero_img_wrap_anim"
        >
          <div className="hero_marquee center col">
            <div className="hero_marquee_grad"></div>
            <div className="hero_marquee_head"> TRUSTED BY </div>
            <Marquee
              className="hero_marquee_wrap"
              gradient
              gradientColor={[17, 92, 205]}
            >
              <img src={adjust} alt="adjust" className="hero_logos" />
              <img src={oaks} alt="oaks" className="hero_logos" />
              <img src={inv} alt="inv" className="hero_logos_d" />
              <img src={escrow} alt="escrow" className="hero_logos" />
              <img src={gidia} alt="gidia" className="hero_logos" />
            </Marquee>
          </div>
        </ScrollEffect>
      </Container>
    </div>
  );
};

export default Hero;
