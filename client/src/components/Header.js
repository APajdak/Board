import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  renderLinks() {
    if (localStorage.token) {
      return (
        <div>
          <span>
            Logged as: <Link to="/Me">{localStorage.getItem("user")}</Link>
          </span>
          <Link to="/signout"> Sign out</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderLinks()}</div>;
  }
}

export default Header;
