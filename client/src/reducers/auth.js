import { AUTH_USER, AUTH_ERROR } from "../actions/actionTypes";

let token = localStorage.getItem("token");
let user = JSON.parse(localStorage.getItem("user"));

const INITIAL_STATE = {
  authenticated: token ? token : "",
  errorMessage: "",
  user: user ? user : {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log(action);
      return {
        ...state,
        errorMessage: "",
        authenticated: action.payload.token,
        user: JSON.parse(localStorage.getItem("user"))
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload, authenticated: "" };
    default:
      return state;
  }
}
