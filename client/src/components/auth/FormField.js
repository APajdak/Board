import React from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div className="form-group">
      <label className="text-uppercase">{label}</label>
      <input
        {...input}
        placeholder={label}
        type={type}
        className={"form-control"}
      />

      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  );
};
