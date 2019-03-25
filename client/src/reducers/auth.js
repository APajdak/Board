import { AUTH_USER, AUTH_ERROR } from "../actions/actionTypes";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, errorMessage: "", authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload, authenticated: "" };
    default:
      return state;
  }
}
