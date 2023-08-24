import React, { useState } from "react";
import { Hero, LandingHeader, WhatWeDo } from "components";
import { howtoone } from "assets/images";

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
    </div>
  );
};

export default Landing;
