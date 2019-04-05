import React, { Component } from "react";
import printDate from "../../utils/printDate";

class UserInfo extends Component {
  render() {
    const { name, email, registeredAt, posts } = this.props.user;
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
            <span onClick={this.props.fetchPosts}>{posts.length}</span>
          ) : (
            <span>{posts.length}</span>
          )}
        </div>
      </div>
    );
  }
}

export default UserInfo;
