import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <span>
            Logged as:
            <Link to={`/profile/${this.props.user.slug}`}>
              {this.props.user.name}
            </Link>
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
  return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps)(Header);
