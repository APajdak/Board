import { AUTH_USER, AUTH_ERROR } from "./actionTypes";
import API from "../config/axiosConfig";

export const signup = (
  { name, email, password },
  callback
) => async dispatch => {
  try {
    const response = await API.post("/users/", { name, email, password });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    callback();
  } catch (ex) {
    dispatch({ type: AUTH_ERROR, payload: "User already exist" });
  }
};
