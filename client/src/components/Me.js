import React, { Component } from "react";
import isLogged from "./auth";
import API from "../config/axiosConfig";

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, posts: null };
  }

  async componentDidMount() {
    const { data } = await API.get("/users/me", {
      headers: { "x-access-token": `Bearer ${this.props.auth}` }
    });
    this.setState({ user: data });
  }

  renderUserData() {
    const { name, email, registeredAt, posts } = this.state.user;
    return (
      <div>
        <div>
          User Name: <span>{name}</span>
        </div>
        <div>
          Email: <span>{email}</span>
        </div>
        <div>
          Joined: <span>{registeredAt}</span>
        </div>
        <div>
          Posts:
          {posts.length ? (
            <span onClick={this.handleClick}>{posts.length}</span>
          ) : (
            <span>{posts.length}</span>
          )}
        </div>
      </div>
    );
  }
  handleClick() {
    console.log("ghege");
  }

  render() {
    return this.state.user ? this.renderUserData() : <div>Fetching user</div>;
  }
}

export default isLogged(Me);
