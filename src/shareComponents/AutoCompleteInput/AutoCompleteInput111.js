import React, { useEffect, Fragment } from "react";

const AutoCompleteInput = ({ type, name, label, value, onChange, values, setValues }) => {

    const handleSelect = () => {
        const google = window.google;

        const options = {
            componentRestrictions: { country: "us" }
        };

        let input = document.getElementById(name);
        let autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.setFields(["address_components", "formatted_address"]);
        autocomplete.addListener("place_changed", () => {

            const addressObject = autocomplete.getPlace();
            const address = addressObject.formatted_address;
            if (address) {
                setValues({
                    ...values,
                    [name]: address
                });
            }

        })

    };

    useEffect(() => {

        let inputField = document.getElementById(name);
        let inputValue = inputField.value.trim();

        inputValue
            ? inputField.setAttribute("filled", "true")
            : inputField.setAttribute("filled", "false");

    }, [onChange]);

    return (
        <Fragment>

            <div className="form-group">
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    className="float-input"
                    onChange={onChange}
                    onSelect={handleSelect}
                    placeholder=""
                />
                <label htmlFor={name}>{label}</label>
            </div>
        </Fragment>
    )
}

export default AutoCompleteInput;