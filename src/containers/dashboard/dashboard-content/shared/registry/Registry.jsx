import React from "react";
import "./Registry.scss"
import { RegistryBanner, RegistryTable } from "components";

const Registry = () => {
  return (
    <div className="registry">
      <RegistryBanner />
      <div className="dash_pad">
        <RegistryTable />
      </div>
    </div>
  );
};

export default Registry;
