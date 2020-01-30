import React, { useEffect } from "react";

const Input = props => {

  useEffect(() => {
    //console.log(inputRef.current.id);
    let inputField = document.getElementById(props.name);
    let inputValue = inputField.value.trim();

    inputValue
      ? inputField.setAttribute("filled", "true")
      : inputField.setAttribute("filled", "false");
  });

  return (
    <div className="form-group">
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        className="float-input"
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={props.readOnly}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
};

export default Input;
