import React, { useState, useRef, useEffect } from "react";
import "./OtpInput.scss";

const OtpInput = ({ value, onChange, index, maxLength }) => {
  const inputRef = useRef(null);

  // Focus the next input when the current one is filled
  const handleFocus = () => {
    if (value.length === maxLength) {
      const nextSibling = inputRef.current.nextSibling;
      //   console.log(prevSibling)
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  // Handle the value change and call the onChange prop
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      // Only allow digits
      onChange(index, newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (index > 0) {
        onChange(index, "");
        const prevSibling = inputRef.current.previousSibling;
        prevSibling.focus();
      }
    }
  };

  //   useEffect(() => {
  //     window.addEventListener("");
  //   });

  return (
    <input
      className="otp_input"
      type="text"
      value={value}
      onChange={handleChange}
      ref={inputRef}
      maxLength={maxLength}
      onKeyUp={handleFocus}
      onKeyDown={handleKeyDown}
    //   style={{ width: "50px", height: "50px", margin: "5px", fontSize: "24px" }}
    />
  );
};

export default OtpInput;
