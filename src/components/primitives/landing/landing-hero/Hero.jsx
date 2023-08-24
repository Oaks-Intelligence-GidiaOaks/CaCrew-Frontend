import React from "react";
import "./Hero.scss";
import { Button, Container } from "components";
import { dash, demo } from "assets/images";

const Hero = () => {
  return (
    <div className="hero">
      <Container>
        <div className="hero_wrap between">
          <div className="hero_text_wrap">
            <div className="hero_text_heading">
              Buy, Sell and Retire Carbon Credits
            </div>
            <div className="hero_text">
              We offer an extensive portfolio of certified carbon credits from
              reputable and verified projects Worldwide.
            </div>
            <div className="hero_text_wrap_btn start">
              <Button text={"Get Started"} className={"hero_text_btn"} />
              <Button text={"Learn More"} className={"hero_text_btn_two"} />
            </div>
          </div>
          <div className="hero_img_wrap center">
            <img src={demo || dash} alt="demo" className="hero_img" />
          </div>
        </div>
        <div className="hero_marquee"></div>
      </Container>
    </div>
  );
};

export default Hero;
