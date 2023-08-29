import React from "react";
import "./FrequentlyAsked.scss";
import AskedAccordion from "../asked-accordion/AskedAccordion";
import { Container } from "components";
import { sphere, spheretwo } from "assets/images";

const list = [
  {
    title: "How Can I Generate Carbon Credit on Carbonible?",
    text: "For organizations to generate Carbon Credit they would take on projects by supporting documents Such as Project Description Document (PDD), Baseline Emission Calculation and Validation Reports. These would be vetted and assessed by our  Project Managers who would ensure that the entire process, from project initiation to credit issuance, is meticulously executed for successful emissions reduction and environmental impact.",
  },
  {
    title: "What Types Of Projects Generate Carbon Credits on Carbonible?",
    text: "Various types of projects can generate carbon credits, including renewable energy projects (solar, wind, hydro), energy efficiency improvements, afforestation, reforestation, methane capture from landfills, and more.",
  },
  {
    title: "How Do Organizations Get Certified on Carbonible? ",
    text: "Organizations can achieve verification by uploading the necessary documents requested during the onboarding process. These include the Identity Document of the Contact Person, Certificate of Incorporation, and a Letter of Authorization. Once we carefully review these documents to ensure their authenticity, we proceed to verify the corporate entity's account for secure access and usage.",
  },
  {
    title: "Who Can Buy Carbon Credits on Carbonible?",
    text: "All corporate entities aiming to offset their greenhouse gas emissions or achieve a Net-Zero target are eligible. Please note that carbon credits are not available for trading purposes; they cannot be resold after purchase.",
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
