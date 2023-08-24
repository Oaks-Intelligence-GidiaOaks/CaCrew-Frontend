import React, { useState } from "react";
import { LandingHeader } from "components";

const Landing = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <LandingHeader menuIsOpen={isMenuOpen} setMenuIsOpen={setMenuIsOpen} />
    </div>
  );
};

export default Landing;
