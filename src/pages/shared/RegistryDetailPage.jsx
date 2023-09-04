import { LandingFooter, LandingHeader } from "components";
import { Dashboard, RegistryDetail } from "containers";
import React from "react";

const RegistryDetailPage = () => {
  return (
    <>
      <LandingHeader />
      <RegistryDetail />
      <LandingFooter />
    </>
  );
};

export default RegistryDetailPage;
