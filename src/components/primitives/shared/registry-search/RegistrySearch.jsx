import React from "react";
import { regimg } from "assets/images";
import { SearchInput } from "components";
import "./RegistrySearch.scss";

const RegistrySearch = () => {
  return (
    <div className="registry_search center col">
      <img src={regimg} alt="banner" className="registry_search_img" />
      <div className="registry_search_head">Track Carbon Credit Life Cycle</div>
      <div className="registry_search_text text">
        Search by Certificate ID
      </div>
      <div className="registry_search_input">
        <SearchInput />
      </div>
      
    </div>
  );
};

export default RegistrySearch;
