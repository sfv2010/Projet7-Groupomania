import axios from "axios";

export const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(
            "http://localhost:4000/api/auth/login",
            user
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_ERROR", payload: err });
    }
};

export const logoutCall = (dispatch) => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
};
