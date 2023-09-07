import React from "react";
import "./WhyUs.scss";
import { Container, WhyUsCard } from "components";
import { whyone, whytwo, whythree, whyfour, whyfive } from "assets/images";
import ScrollEffect from "components/animation/ScrollEfect";

const list = [
  {
    image: whyone,
    heading: "Secured and Trusted",
    text: "We prioritize the security of user data and transactions. Carbonible employs robust security measures to safeguard sensitive information and build trust with our users.",
  },
  {
    image: whytwo,
    heading: "Competitive Pricing",
    text: "Competitive rates for buying and selling carbon credits in our dynamic marketplace. Low transaction fees when your Organization ",
  },
  {
    image: whythree,
    heading: "Transparency",
    text: "We prioritize transparency in all our operations. Users can trust that their emissions reductions and carbon credits are accurately tracked and verified",
  },
  {
    image: whyfour,
    heading: "Collaboration",
    text: "We believe in the power of collective action. That's why we offer organizations the opportunity to add staff members who can actively track and engage in offset projects.",
  },
  {
    image: whyfive,
    heading: "Easy To Use",
    text: "Carbonible offers a user-friendly platform that makes it easy for organizations to engage in carbon trading and emissions reduction projects.",
  },
  {
    image: whyfive,
    heading: "Compliance",
    text: "Carbonible helps ensure compliance with emissions regulations and offers robust reporting tools. This simplifies the often complex process of meeting legal requirements.",
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
