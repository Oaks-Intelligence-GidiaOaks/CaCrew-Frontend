import React from "react";
import "./ForEnterprise.scss";
import { Button, Container } from "components";
import { Link } from "react-router-dom";
import { tick, fade } from "assets/images";
import ScrollEffect from "components/animation/ScrollEfect";

const listone = [
  "Lorem ipsum dolo",
  "Lorem ipsum dolo",
  "Lorem ipsum dolo",
  "Lorem ipsum dolo",
];
const listtwo = [
  "Lorem ipsum dolo",
  "Lorem ipsum dolo",
  "Lorem ipsum dolo",
  fade,
];

const ForEnterprise = () => {
  return (
    <Container>
      <ScrollEffect
        inViewProperties={{
          y: [-20, 0],
          opacity: [0, 1],
        }}
        inViewDelay={1}
        inViewTransitionTime={0.5}
        className="for_ent"
      >
        <div className="for_ent_wrap between">
          <div className="for_ent_text_wrap">
            <div className="for_ent_text_sub">CARBONIBLE FOR ENTERPRISE</div>
            <div className="for_ent_text_head">
              Assign Employees to Projects
            </div>
            <div className="for_ent_text">
              Projects are created and assigned to organization’s staff to
              supervise and allocate carbon credit.
            </div>
            <Link to={"/register-company"} className="link">
              <Button text={"Get Started"} className={"for_ent_btn"} />
            </Link>
          </div>
          <div className="for_ent_list_wrap center">
            <div className="for_ent_list_items">
              {listone.map((item, idx) => (
                <div className="for_ent_list_item start" key={idx}>
                  <img src={tick} alt="tick" className="for_ent_list_img" />
                  <div className="for_ent_list_text">{item}</div>
                </div>
              ))}
            </div>
            <div className="for_ent_list_items">
              {listtwo.map((item, idx) => (
                <>
                  {idx !== 3 && (
                    <div className="for_ent_list_item start" key={idx}>
                      <img src={tick} alt="tick" className="for_ent_list_img" />
                      <div className="for_ent_list_text">{item}</div>
                    </div>
                  )}
                  {idx === 3 && <img src={item} alt="house" />}
                </>
              ))}
            </div>
          </div>
        </div>
      </ScrollEffect>
    </Container>
  );
};

export default ForEnterprise;
