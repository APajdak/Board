import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <span>
            Logged as: <Link to="/me">{this.props.userName}</Link>
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
function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, userName: state.auth.user };
}

export default connect(mapStateToProps)(Header);
