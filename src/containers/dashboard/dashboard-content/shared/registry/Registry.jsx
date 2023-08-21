import React from "react";
import { RegistryBanner, RegistrySearch, RegistryTable } from "components";

const Registry = () => {
  return (
    <div className="registry">
      <RegistryBanner />
      <div className="dash_pad">
        <RegistrySearch />
        <RegistryTable />
      </div>
    </div>
  );
};

export default Registry;
