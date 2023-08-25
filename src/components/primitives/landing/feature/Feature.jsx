import React from "react";
import "./Feature.scss";
import { strone, strtwo, strthree, strfour, strfive,  } from "assets/images";

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
    image: strfive,
    text: "Safe Carbon Credit Storage",
  },
];

const Feature = () => {
  return (
    <div className="feature">
      <div className="feature_head">Features at a Glance</div>
    </div>
  );
};

export default Feature;
