import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Octicon, { Person, SignOut, SignIn } from "@githubprimer/octicons-react";

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="float-right">
          <span className="mr-4">
            <Link
              to={`/profile/${this.props.user.slug}`}
              onClick={() => window.location.refresh()}
              style={{ textDecoration: "none" }}
            >
              {this.props.user.name}
              <Octicon
                icon={Person}
                verticalAlign="middle"
                size="medium"
                className="ml-2"
              />
            </Link>
          </span>
          <Link to="/signout" style={{ textDecoration: "none" }}>
            Sign out
            <Octicon
              icon={SignOut}
              verticalAlign="middle"
              size="medium"
              className="ml-2"
            />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="float-right">
          <span className="mr-4">
            <Link to="/signin" style={{ textDecoration: "none" }}>
              Sign in
              <Octicon
                icon={SignIn}
                verticalAlign="middle"
                size="medium"
                className="ml-2"
              />
            </Link>
          </span>
          <Link to="/signup">
            <span className="btn btn-primary" style={{ fontSize: "1.875rem" }}>
              Sign up
            </span>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <header className="row align-items-center" style={{ height: "100px" }}>
        <h2 className="col-auto mr-auto">Discussion Board</h2>
        <h2 className="col-auto">{this.renderLinks()}</h2>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps)(Header);
