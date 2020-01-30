import React, { useEffect, Fragment } from "react";
import Script from "react-load-script";

const AutoCompleteInput = ({ type, name, label, value, onChange, setValues }) => {

    const handleScriptLoad = () => {
        const google = window.google;
        const options = {
            componentRestrictions: { country: "us" }
        };
        let input = document.getElementById(name);

        let autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.setFields(["address_components", "formatted_address", "geometry"]);
        autocomplete.addListener("place_changed", () => {

            const addressObject = autocomplete.getPlace();
            const addressComponents = addressObject.address_components;
            const address = addressObject.formatted_address;
            let lat = addressObject.geometry.location.lat();
            let long = addressObject.geometry.location.lng();

            let address_postCode = addressComponents.filter(
                item => item.types[0] === "postal_code"
            );

            let zip = address_postCode.length ? address_postCode[0].long_name : "";

            if (address) {
                if (name === "origin") {
                    setValues({
                        field: name,
                        queryResult: address,
                        lat: lat,
                        long: long,
                        o_zip: zip,
                    });
                } else if (name === "destination") {
                    setValues({
                        field: name,
                        queryResult: address,
                        d_zip: zip
                    });
                }
            }
        })
    };

    useEffect(() => {

        let inputField = document.getElementById(name);
        let inputValue = inputField.value.trim();

        inputValue
            ? inputField.setAttribute("filled", "true")
            : inputField.setAttribute("filled", "false");

    });

    return (
        <Fragment>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAeXeJS0BA9IykvlFMAg3gOs4y3EKSxPhM&libraries=geometry,drawing,places" onLoad={handleScriptLoad}
            />
            <div className="form-group">
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    className="float-input"
                    onChange={onChange}
                    placeholder=""
                />
                <label htmlFor={name}>{label}</label>
            </div>
        </Fragment>
    )
}

export default AutoCompleteInput;