import React, { Fragment, useContext, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import "./Login.scss";
import Input from "../../shareComponents/Input/Input";
import { Link, useHistory} from "react-router-dom";
import useForm from "../../custom-hooks/FormLogic";
import AuthContext from "../../Context/auth/authContext";

const Login = () => {

  const authContext = useContext(AuthContext);
  const { keepLoggedIn,login, error } = authContext;

  //For Route
  const history = useHistory();

  const initialLoginData = {
    email: "",
    password: ""
  };

  const submitSuccessfully = () => {
    login(values);
  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    validator
  } = useForm(initialLoginData, submitSuccessfully);

  useEffect(() => {
    if(keepLoggedIn){
      history.push("./all-purchase-orders");
    }
  }, [keepLoggedIn])
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
              <Input
                type="password"
                name="password"
                value={values.password}
                label="Password*"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validator.message("password", values.password, "required")}
              {touched.password && validator.errorMessages.password && (
                <p className="error-msg">{validator.errorMessages.password}</p>
              )}
              <button type="submit" className="btn btn-danger btn-block">SIGN IN</button>
            </form>
            <p className="text-center forgetPass"><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
