import React from "react";
import "./FrequentlyAsked.scss";
import AskedAccordion from "../asked-accordion/AskedAccordion";
import { Container } from "components";

const list = [
  {
    title: "How Can I Generate Carbon Credit on Carbonible?",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat",
  },
  {
    title: "How Can I Generate Carbon Credit on Carbonible?",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat",
  },
  {
    title: "How Can I Generate Carbon Credit on Carbonible?",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat",
  },
  {
    title: "How Can I Generate Carbon Credit on Carbonible?",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat",
  },
];

const FrequentlyAsked = () => {
  return (
    <Container>
      <div className="asked center col">
        <div className="grad_text">
          Frequently Asked <span>Questions</span>
        </div>
        <div className="asked_wrap">
          {list.map((item, idx) => (
            <div key={idx}>
              <AskedAccordion title={item.title} text={item.text} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FrequentlyAsked;
