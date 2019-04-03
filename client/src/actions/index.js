import { AUTH_USER, AUTH_ERROR } from "./actionTypes";
import API from "../config/axiosConfig";

export const signup = (
  { name, email, password },
  callback
) => async dispatch => {
  try {
    const response = await API.post("/users/", { name, email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.name);
    dispatch({ type: AUTH_USER, payload: response.data });
    callback();
  } catch (ex) {
    dispatch({ type: AUTH_ERROR, payload: "User already exist" });
  }
};

export const signin = ({ email, password }, callback) => async dispatch => {
  try {
    const response = await API.post("/auth/", { email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.name);
    dispatch({ type: AUTH_USER, payload: response.data });
    callback();
  } catch (ex) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid email or password" });
  }
};

export const signout = callback => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  callback();
  return {
    type: AUTH_USER,
    payload: ""
  };
};
