import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "../constant";
import { alertAction } from "./alert.action";
import setAuthToken from "../../utils/setAuthToken.utils";


// authenticate user
export const userLoadedAction = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/v1/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


// login user
export const loginUserAction = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("api/v1/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(userLoadedAction());
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};


// registers a new user
export const registerUserAction = ({ name, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/v1/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(userLoadedAction());
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};


// logout user
export const logoutAction = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT });
};
