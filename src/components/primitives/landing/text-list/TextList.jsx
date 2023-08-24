import React from "react";

const TextList = ({ list, heading }) => {
  return (
    <div className="text_list">
      <div dangerouslySetInnerHTML={heading} className="text_list_heading" />
      {list?.map((item, idx) => (
        <div key={idx} className="text_list_text">
          {item}
        </div>
      ))}
    </div>
  );
};

export default TextList;
