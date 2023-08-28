import React from "react";
import "./Feature.scss";
import { strone, strtwo, strthree, strfour, strfive, strsix } from "assets/images";
import FeaturesCard from "../features-card/FeaturesCard";
import { Container } from "components";

const list = [
  {
    image: strone,
    text: "Safe and Secure",
  },
  {
    image: strtwo,
    text: "B2B Payment",
  },
  {
    image: strthree,
    text: "Carbon Credit Certificate",
  },
  {
    image: strfour,
    text: "Open & Locked Wallet",
  },
  {
    image: strfive,
    text: "Safe Carbon Credit Storage",
  },
  {
    image: strsix,
    text: "Track Carbon Credit",
  },
];

const Feature = () => {
  return (
    <div className="feature">
      <Container>
        <div className="center col">
          <div className="feature_head">Features at a Glance</div>
          <div className="feature_wrap">
            {list.map((item, idx) => (
              <div className="feature_wrap_item" key={idx}>
                <FeaturesCard image={item.image} text={item.text} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Feature;
