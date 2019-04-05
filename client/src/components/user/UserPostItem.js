import React, { Component } from "react";
import printDate from "../../utils/printDate";

class UserPostItem extends Component {
  render() {
    const { thread, createdAt, content } = this.props.data;
    return (
      <div>
        <span>{thread.title} </span>
        <span>{printDate(createdAt)}</span>
        <div>{content}</div>
      </div>
    );
  }
}

export default UserPostItem;
