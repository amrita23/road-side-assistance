import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    FORGET_PASSWORD,
    LOGOUT

} from "../Types";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: true,
                user: action.payload.data.user
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("xtoken",action.payload.data.user.token);
            sessionStorage.setItem("keepLoggedIn",true);
            return {
                ...state,
                token: action.payload.data.user.token,
                isAuthenticated: true,
                keepLoggedIn: true,
                error: null
            }
        case LOGOUT:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem("xtoken");
            sessionStorage.removeItem("keepLoggedIn",true);
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                keepLoggedIn: false,
                user: null,
                error: "Invalid login credentials"
            };
    }

}