import React from "react";
import "./WhyUs.scss";
import { Container, WhyUsCard } from "components";
import { whyone, whytwo, whythree, whyfour, whyfive } from "assets/images";

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
        <div className="why_us_heading">Why Choose Carbonible?</div>
        <div className="why_us_card_wrap">
          {list.map((item, idx) => (
            <div key={idx}>
              <WhyUsCard
                image={item.image}
                heading={item.heading}
                text={item.text}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default WhyUs;
