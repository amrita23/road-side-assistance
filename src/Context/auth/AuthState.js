import React, { useReducer } from "react";
import axios from 'axios';

import setAuthToken from "../../utils/setAuthToken";

import {
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    FORGET_PASSWORD,
    SERVER_URL,
    LOGIN_FAIL
} from "../Types";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('xtoken'),
        isAuthenticated: (localStorage.getItem('xtoken') ? true : false),
        keepLoggedIn: (sessionStorage.getItem('keepLoggedIn') ? true : false),
        user: null,
        error: null,
        success: null

    }

    const SERVER = SERVER_URL;
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    const loadUser = async () => {
        if (localStorage.getItem("xtoken")) {
            setAuthToken(localStorage.getItem("xtoken"));
            try {
                const response = await axios.get(`${SERVER}api/auth`);
                dispatch({
                    type: USER_LOADED,
                    payload: response.data
                })
            } catch (error) {
              //  console.log("Token Error" + error.response.data.errors);

                dispatch({
                    type: AUTH_ERROR,
                    payload: error.response.data.errors
                })
            }
        } else {
            //console.log("Token Not Found");
            dispatch({
                type: AUTH_ERROR,
                payload: null
            })
        }
    }

    //Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`${SERVER}api/auth`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            loadUser();
        } catch (error) {
            console.log("Login Error"+error.response.data.errors[0].msg);
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.errors[0].msg
            })
        }
    }

    //Logout user
    const logout = () => dispatch({ type: LOGOUT })
   

    return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            keepLoggedIn: state.keepLoggedIn,
            user: state.user,
            success: state.success,
            error: state.error,
            login,
            loadUser,
            logout
        }}
    >
        {props.children}
    </AuthContext.Provider>

}

export default AuthState;