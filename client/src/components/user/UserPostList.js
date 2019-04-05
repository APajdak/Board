import React, { Component } from "react";
import UserPostItem from "./UserPostItem";

class UserPostList extends Component {
  render() {
    return this.props.posts.map((element, index) => (
      <UserPostItem key={index} data={element} />
    ));
  }
}

export default UserPostList;
