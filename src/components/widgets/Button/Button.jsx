import React from "react";
import "./Button.scss";
import { ThreeDots } from "react-loader-spinner";

const Button = ({ text, loading, className, type }) => {
  return (
    <button type={type} className={`button ${className} center`}>
      {loading ? (
        <ThreeDots
          height="15"
          width="15"
          radius="9"
          color="#ffffff"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
