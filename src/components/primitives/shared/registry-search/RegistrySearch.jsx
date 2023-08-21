import { regimg } from "assets/images";
import React from "react";

const RegistrySearch = () => {
  return (
    <div className="center col m_10">
      <img src={regimg} alt="banner" />
      <div>Track Carbon Credit Life Cycle</div>
      <div>
        Search by Verra Certificate ID, Carbonible ID, Organization or Project
        name
      </div>
    </div>
  );
};

export default RegistrySearch;
