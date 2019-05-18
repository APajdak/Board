import React, { Component } from "react";
import printDate from "../../utils/printDate";

class UserPostItem extends Component {
  render() {
    const { thread, createdAt, content } = this.props.data;
    return (
      <div
        className="card text-white bg-primary mb-3"
        style={{ width: "75%", margin: "auto" }}
      >
        <div className="card-header">
          <h4 className="float-left">Thread name : {thread.title}</h4>
          <div className="float-right">{printDate(createdAt)}</div>
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
    );
  }
}

export default UserPostItem;
