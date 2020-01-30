import React, { Fragment } from "react";
import logo from "../../assets/img/logo.png";
import Input from "../../shareComponents/Input/Input";
import useForm from "../../custom-hooks/FormLogic";
import { Link, useHistory } from "react-router-dom";

const ForgotPassword = () => {
    //For Route
    const history = useHistory();

    const initialData = {
        email: "",

    };

    const SuccessfullMsg = () => {
        // console.log("Login Successfully");
        //history.push("/new-purchase-orders");
    }

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        validator,
        error
    } = useForm(initialData, SuccessfullMsg);
    return (
        <Fragment>
            <div className="login-container">
                <div className="login-area">
                    <figure className="text-center">
                        <img src={logo} alt="logo" />
                        <figcaption>Roadside Assistance</figcaption>
                    </figure>
                    <div className="login-form-area">
                        <p className="error-msg">{error ? error : ""}</p>
                        <form onSubmit={handleSubmit} noValidate>
                            <Input
                                type="text"
                                name="email"
                                value={values.email}
                                label="Email*"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {validator.message("email", values.email, "required|email")}
                            {touched.email && validator.errorMessages.email && (
                                <p className="error-msg">{validator.errorMessages.email}</p>
                            )}

                            <button type="submit" className="btn btn-danger btn-block">Reset Password</button>
                        </form>
                        <p className="text-center forgetPass"><Link to="/">Login</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword;