import React, { useState } from "react";
import { Hero, LandingHeader } from "components";

const Landing = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <LandingHeader menuIsOpen={isMenuOpen} setMenuIsOpen={setMenuIsOpen} />
      <Hero />
    </div>
  );
};

export default Landing;
