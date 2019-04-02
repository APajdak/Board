import React from "react";

export default ({ input, label, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} palceholder={label} type={type} />
    </div>
  );
};
