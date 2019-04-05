import React, { Component } from "react";
import isLogged from "../auth";
import API from "../../config/axiosConfig";
import UserInfo from "./UserInfo";
import UserPostList from "./UserPostList";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", user: null, posts: null };
  }

  async componentDidMount() {
    try {
      var { data } = await API.get(`/users/${this.props.match.params.slug}`, {
        headers: { "x-access-token": `Bearer ${this.props.auth}` }
      });
      this.setState({ user: data });
    } catch (ex) {
      this.setState({ error: ex.response.data });
    }
  }

  fetchPosts = async () => {
    const { data } = await API.get(`/posts/${this.state.user.slug}`, {
      headers: { "x-access-token": `Bearer ${this.props.auth}` }
    });
    this.setState({ posts: data.posts });
  };

  render() {
    return (
      <div>
        {this.state.error ? (
          <div>{this.state.error}</div>
        ) : this.state.user ? (
          <UserInfo user={this.state.user} fetchPosts={this.fetchPosts} />
        ) : (
          <div>Fetching user data</div>
        )}

        {this.state.posts && <UserPostList posts={this.state.posts} />}
      </div>
    );
  }
}

export default isLogged(User);
