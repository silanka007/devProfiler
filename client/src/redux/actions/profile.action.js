import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "../constant";
import { alertAction } from "./alert.action";

// fetch user profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// create and edit user profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      alertAction(
        edit ? "profile updated successfully" : "profile created successfully",
        "success"
      )
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// add experience to user profile
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/v1/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      Payload: res.data,
    });
    dispatch(alertAction("Experience added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// add Education to user profile
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/v1/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      Payload: res.data,
    });
    dispatch(alertAction("Education added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/v1/profile/experience/${id}`);
    dispatch(alertAction("Experience removed successfully", "success"));
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/v1/profile/education/${id}`);
    dispatch(alertAction("Education removed successfully", "success"));
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { error: err.response.statusText, status: err.response.status },
    });
  }
};

// delete user account
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "are you sure you want to DELETE your account? This cannot be undone!"
    )
  ) {
    try {
      await axios.delete("api/v1/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(alertAction('Account Deleted. See you around!', 'danger'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          error: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
