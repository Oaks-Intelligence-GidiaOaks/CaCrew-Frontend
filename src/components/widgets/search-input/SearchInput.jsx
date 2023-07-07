import React from "react";
import "./SearchInput.scss";
import { search } from "assets/images";

const SearchInput = () => {
  return (
    <div className="search_input_wrap">
      <input className="search_input" placeholder="Search" />
      <img src={search} alt="icon" className="search_img" />
    </div>
  );
};

export default SearchInput;