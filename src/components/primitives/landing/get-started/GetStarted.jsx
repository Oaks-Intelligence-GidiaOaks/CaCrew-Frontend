import React from "react";
import "./GetStarted.scss";
import { Button, Container, GetStartedCard } from "components";
import { lapone, lapthree, laptwo } from "assets/images";
import { Link } from "react-router-dom";

const list = [
  {
    image: lapone,
    heading: "Register Organization",
    text: "Enter Organization Details to get Registered.",
  },
  {
    image: laptwo,
    heading: "Get Verified",
    text: "Upload required Documents and get Verified.",
  },
  {
    image: lapthree,
    heading: "Buy, Sell or Retire",
    text: "Buy, Sell or Retire. Join Carbonible Market place for a Greener world.",
  },
];

const GetStarted = () => {
  return (
    <Container>
      <div className="get_started center col">
        <div className="grad_text">
          How to get started with <span>Carbonible</span>
        </div>
        <div className="get_started_wrap">
          {list.map((item, idx) => (
            <div key={idx} className="get_started_item">
              <GetStartedCard
                image={item.image}
                heading={item.heading}
                text={item.text}
                number={idx + 1}
              />
            </div>
          ))}
        </div>
        <Link to={"/register-company"} className="link">
          <Button text={"Register Now"} className={"get_started_btn"}/>
        </Link>
      </div>
    </Container>
  );
};

export default GetStarted;
