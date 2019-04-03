import React from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} palceholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};
