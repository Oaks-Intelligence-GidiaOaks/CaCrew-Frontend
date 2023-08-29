import React from "react";
import "./EcoSystem.scss";
import TextList from "../text-list/TextList";
import { Container } from "components";
import {
  orbit,
  orbiteight,
  orbitfive,
  orbitfour,
  orbitseven,
  orbitsix,
  orbitthree,
  orbittwo,
  whyfive,
} from "assets/images";
import ScrollEffect from "components/animation/ScrollEfect";

const EcoSystem = () => {
  return (
    <Container>
      <div className="eco_system between">
        <div className="eco_system_list">
          <TextList
            heading={"About the <span>Carbonible Ecosystem</span>"}
            list={[
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
            ]}
            noButtton
          />
        </div>
        <ScrollEffect
          inViewProperties={{
            opacity: [0, 1],
          }}
          inViewDelay={0.8}
          inViewTransitionTime={0.5}
          className="eco_system_anim_wrap center"
        >
          <div class="eco_system_anim_circle center">
            <img src={orbit} alt="orbit" className="orbit" />
            <img src={orbitfour} alt="orbit" className="orbitfour" />
            <img src={orbitsix} alt="orbit" className="orbitsix" />
            <img src={orbiteight} alt="orbit" className="orbiteight" />
            <div className="eco_system_anim_circle_two center">
              <img src={orbittwo} alt="orbit" className="orbittwo" />
              <img src={orbitthree} alt="orbit" className="orbitthree" />
              <img src={orbitseven} alt="orbit" className="orbitseven" />
              <img src={orbitfive} alt="orbit" className="orbitfive" />
            </div>
          </div>
        </ScrollEffect>
      </div>
    </Container>
  );
};

export default EcoSystem;
