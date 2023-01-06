import React from "react";

const Input = ({ name, type, value, onChange, placeholder }) => {
  return (
    <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default Input;
