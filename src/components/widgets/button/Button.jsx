import React from "react";
import "./Button.scss";
import { ThreeDots } from "react-loader-spinner";

const Button = ({ text, loading, disabled, className, type, loadColor, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={` ${disabled ? "invalid" : "button"} ${className} center `}
      // style={{ cursor: "not-allowed" }}
    >
      {loading ? (
        <ThreeDots
          height="15"
          width="15"
          radius="9"
          color={loadColor ? "" :"#ffffff"}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
