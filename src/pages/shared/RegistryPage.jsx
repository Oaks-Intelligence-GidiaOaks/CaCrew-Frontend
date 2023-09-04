import { LandingFooter, LandingHeader } from "components";
import { Dashboard, Registry } from "containers";
import React from "react";

const RegistryPage = () => {
  return (
    <>
      <LandingHeader />
      <Registry />
      <LandingFooter />
    </>
  );
};

export default RegistryPage;
