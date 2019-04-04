import React, { Component } from "react";
import isLogged from "./auth";
import API from "../config/axiosConfig";
import printDate from "../utils/printDate";

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
          Joined: <span>{printDate(registeredAt)}</span>
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
  handleClick = async () => {
    const { data } = await API.get("/posts", {
      headers: { "x-access-token": `Bearer ${this.props.auth}` }
    });
    this.setState({ posts: data });
  };
  renderPosts() {
    console.log(this.state.posts);
    return (
      <div>
        {this.state.posts.map((element, index) => {
          return (
            <div key={index}>
              <span>{element.thread.title} </span>
              <span>{printDate(element.createdAt)}</span>
              <div>{element.content}</div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.user ? this.renderUserData() : <div>Fetching user</div>}
        {this.state.posts && this.renderPosts()}
      </div>
    );
  }
}

export default isLogged(Me);
