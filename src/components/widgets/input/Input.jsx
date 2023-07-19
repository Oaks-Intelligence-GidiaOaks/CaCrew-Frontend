import React, { useState } from "react";
import "./Input.scss";
import { info_circle, eye, calendar } from "assets/images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({
  type = "text",
  label,
  tooltip,
  date,
  input,
  meta,
  password,
  select,
  selectDefault,
  options,
  textArea,
  placeholder,
  className,
  disabled,
}) => {
  const [passwordType, setPasswordType] = useState("password");
  // const parseDate = (value) => {
  // console.log(value.target);
  // return parseISO(value).toISOString();
  // };

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={`input ${className}`}>
      <div className="input_label_wrap between">
        {label && (
          <div className="input_label_wrap_text">
            {label} <span className="input_label_wrap_text_required">*</span>
          </div>
        )}

        <div className="tooltip">
          {tooltip && (
            <>
              <img src={info_circle} alt="icon" />
              <div className="tooltip_pop_up">{tooltip}</div>
            </>
          )}
        </div>
      </div>
      <div className="input_main_wrap" style={{ height: textArea && "110px" }}>
        {select ? (
          <select
            className="input_main"
            onChange={input.value}
            {...input}
            style={{ width: "100%" }}
          >
            <option value="">{selectDefault || "Select an option"}</option>
            {Object.entries(options || {})?.map((option) => {
              return (
                <option key={option[1]} value={option[1]}>
                  {option[0]}
                </option>
              );
            })}
          </select>
        ) : textArea ? (
          <textarea
            className="input_main"
            {...input}
            style={{
              width: "100%",
              height: "100%",
            }}
            rows={4}
          />
        ) : date ? (
          <DatePicker
            className="datepicker"
            {...input}
            selected={input.value}
            onChange={input.onChange}
            //  onChangeRaw={(date) => input.onChange(parseDate(date))}
            dateFormat="dd/MM/yyyy"
          />
        ) : (
          <input
            className="input_main"
            {...input}
            style={{ width: (!date || !password) && "100%" }}
            type={password ? passwordType : type}
            placeholder={placeholder}
            disabled = {disabled}
          />
        )}
        {password && (
          <div className="date center" onClick={togglePasswordType}>
            <img src={eye} alt="icon" />
          </div>
        )}
        {date && (
          <div className="date center">
            <img src={calendar} alt="icon" />
          </div>
        )}
      </div>
      <div className="input_error">{meta?.error}</div>
    </div>
  );
};

export default Input;
