import { useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const useForm = (initialData, callback) => {
  const makeInitialTouched = obj => {
    for (let key in obj) {
      obj[key] = false;
    }
    return obj;
  };

  const makeSubmitTouched = obj => {
    for (let key in obj) {
      obj[key] = true;
    }
    return obj;
  };

  let initialTouched = { ...initialData };
  let submitTouched = { ...initialData };

  const [values, setValues] = useState(initialData);
  const [touched, setTouched] = useState(makeInitialTouched(initialTouched));
  const [validator] = useState(new SimpleReactValidator());
  const [error, setError] = useState("");


  const handleChange = e => {
    setError("");
    setTouched({
      ...touched,
      [e.target.name]: true
    });
    if (e.target.type === "checkbox") {
      setValues({
        ...values,
        [e.target.name]: e.target.checked
      });
    } else if (e.target.name === "service_type" || e.target.name === "regular_gas_diesel" || e.target.name === "origin" || e.target.name === "destination" || (e.target.name === "four_wheels_turn" && e.target.value === "no") || e.target.name === "will_anyone_vehicle") {
      
      setValues({
          ...values,
          [e.target.name]: e.target.value,
          isCalculate: false,
          // amount: "",
          // total_amount: ""
        });
    }
    else if (e.target.name === "amount") {

      const service_tax = 0.035;
      let price = parseFloat(e.target.value);
      let cal_price = price ? price + (price * service_tax) : "";

      setValues({
        ...values,
        [e.target.name]: e.target.value,
        total_amount: cal_price
      });
    }
    else {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }

  };

  const handleBlur = e => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });

  };

  const handleSubmit = e => {
    e.preventDefault();
    setTouched(makeSubmitTouched(submitTouched));

    if (validator.allValid()) {
      callback();
      setTouched(makeInitialTouched(initialTouched));
    }
  };

  return {
    handleChange,
    values,
    setValues,
    touched,
    handleBlur,
    validator,
    handleSubmit,
    error,
    setError
  };
};

export default useForm;
