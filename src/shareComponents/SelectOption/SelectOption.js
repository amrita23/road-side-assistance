import React, { useEffect } from "react";

const SelectOption = (props) => {

    useEffect(()=> {
        let selectBox = document.getElementById(props.name);
        let selectBoxValue = selectBox.value.trim();
        selectBoxValue === "" ? selectBox.setAttribute("filled","false") : selectBox.setAttribute("filled","true");
    }, [props.onChange])
    
    const list = (props.option.length > 0) ?
        props.option.map((options, index) => <option key={index} value={options}>{options}</option>)
        : "";

    return (
        <div className="form-group">
            <select
                className="custom-select"
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                readOnly={props.readOnly}
            >
                <option value="" hidden></option>
                {list}

            </select>
            <label className="select-label">{props.label}</label>
        </div>
    )
}
export default SelectOption;