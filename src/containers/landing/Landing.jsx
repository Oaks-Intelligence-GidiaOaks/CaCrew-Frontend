import React, { useState } from "react";
import {
  EcoSystem,
  Feature,
  FrequentlyAsked,
  GetStarted,
  Hero,
  LandingHeader,
  Steps,
  WhatWeDo,
  WhyUs,
} from "components";
import { howtoone, howtotwo } from "assets/images";

const Landing = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <LandingHeader menuIsOpen={isMenuOpen} setMenuIsOpen={setMenuIsOpen} />
      <Hero />
      <WhatWeDo
        image={howtoone}
        background={"#F4F3FF"}
        list={[
          "Get your projects certified by recognized standards like Verra and ICR.",
          "Stay updated on emission reduction projects and track the progress of your project.",
          "We allow several project types such as renewable energy, afforestation, waste management, etc.",
          "Assign an employee to a project to keep track and follow up on the progress of a project. ",
        ]}
        heading={
          "Start Projects to Generate Carbon Credits From Your <span> Green Practices</span>"
        }
      />
      <WhatWeDo
        reverse
        image={howtotwo}
        background={"#F4F3FF"}
        list={[
          "Sell certified carbon credits generated from your sustainable initiatives.",
          "List your carbon credit for sale and set you desired price and quantity you wish to sell.",
          "Follow our simple steps, and you'll have your carbon credits listed and ready to sell in no time.",
          "Engage with potential buyers, negotiate terms and finalize transactions.",
        ]}
        heading={
          "Sell certified carbon credits generated from your <span> sustainable initiatives.</span>"
        }
      />
      <WhatWeDo
        image={howtoone}
        background={"#F4F3FF"}
        list={[
          "Choose from a diverse portfolio of certified carbon credit projects.",
          "Select the carbon credit that aligns with your sustainability goals.",
          "Purchase your carbon credit through our secure platform.",
        ]}
        heading={"Buy Carbon Credit From <span>Verified Organizations</span>"}
      />
      <Steps />
      <WhyUs />
      <EcoSystem />
      <GetStarted />
      <Feature />
      <FrequentlyAsked />
    </div>
  );
};

export default Landing;
