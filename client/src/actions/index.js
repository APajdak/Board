import { AUTH_USER, AUTH_ERROR } from "./actionTypes";
import API from "../utils/BoardApi";
import Auth from "../utils/Auth";

export const signup = (
  { name, email, password },
  callback
) => async dispatch => {
  try {
    const { data } = await API.post("/users/", { name, email, password });
    Auth.saveData(data.token);
    dispatch({ type: AUTH_USER, payload: data });
    callback();
  } catch (ex) {
    dispatch({ type: AUTH_ERROR, payload: "User already exist" });
  }
};

export const signin = ({ email, password }, callback) => async dispatch => {
  try {
    const { data } = await API.post("/auth/", { email, password });
    Auth.saveData(data.token);
    dispatch({ type: AUTH_USER, payload: data });
    callback();
  } catch (ex) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid email or password" });
  }
};

export const signout = callback => {
  Auth.deleteData();
  callback();
  return {
    type: AUTH_USER,
    payload: ""
  };
};
