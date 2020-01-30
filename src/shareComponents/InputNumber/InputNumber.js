import React, { useEffect } from "react";
import NumberFormat from 'react-number-format';

const InputNumber = props => {
    useEffect(() => {
        let inputField = document.getElementById(props.name);
        let inputValue = props.value //inputField.value.trim();
      
        inputValue
          ? inputField.setAttribute("filled", "true")
          : inputField.setAttribute("filled", "false");

          //console.log(inputField+"///"+inputValue);
          
      });
    
      return (
        <div className="form-group">
          <NumberFormat
            type={props.type}
            name={props.name}
            id={props.name}
            value={props.value}
            className="float-input"
            onChange={props.onChange}
            onBlur={props.onBlur}
            readOnly={props.readOnly}
            format={props.format}
          />
          <label htmlFor={props.name}>{props.label}</label>
        </div>
      );
}
export default InputNumber