import React from "react";
import "./Registry.scss"
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
