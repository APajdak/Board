import React, { Component } from "react";
import isLogged from "./auth";

class Me extends Component {
  render() {
    return <div>{localStorage.getItem("user")}</div>;
  }
}

export default isLogged(Me);
