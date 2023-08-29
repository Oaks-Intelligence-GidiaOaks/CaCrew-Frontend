import React from "react";
import "./WhyUs.scss";
import { Container, WhyUsCard } from "components";
import { whyone, whytwo, whythree, whyfour, whyfive } from "assets/images";
import ScrollEffect from "components/animation/ScrollEfect";

const list = [
  {
    image: whyone,
    heading: "Easy To Use",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
  {
    image: whytwo,
    heading: "Verified by Verra and ICR",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
  {
    image: whythree,
    heading: "Easy To Use",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
  {
    image: whyfour,
    heading: "Verified by Verra and ICR",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
  {
    image: whyfive,
    heading: "Verified by Verra and ICR",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
  {
    image: whyfive,
    heading: "Verified by Verra and ICR",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  },
];

const WhyUs = () => {
  return (
    <div className="why_us">
      <Container>
        <ScrollEffect
          inViewProperties={{
            y: [20, 0],
            opacity: [0, 1],
          }}
          inViewDelay={0.2}
          inViewTransitionTime={0.5}
          className="why_us_heading"
        >
          Why Choose Carbonible?
        </ScrollEffect>
        <div className="why_us_card_wrap">
          {list.map((item, idx) => (
            <ScrollEffect
              inViewProperties={{
                y: [20, 0],
                opacity: [0, 1],
              }}
              inViewDelay={(idx + 1) * 0.3}
              inViewTransitionTime={0.5}
            >
              <div key={idx}>
                <WhyUsCard
                  image={item.image}
                  heading={item.heading}
                  text={item.text}
                />
              </div>
            </ScrollEffect>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default WhyUs;
