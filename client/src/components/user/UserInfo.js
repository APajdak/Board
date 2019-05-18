import React, { Component } from "react";
import printDate from "../../utils/printDate";

class UserInfo extends Component {
  render() {
    const { name, role, registeredAt, posts } = this.props.user;
    return (
      <table
        className="table table-active text-center mb-5"
        style={{ width: "75%", margin: "auto" }}
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Joined</th>
            <th scope="col">Role</th>
            <th scope="col">Posts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{printDate(registeredAt)}</td>
            <td>{role}</td>
            {posts.length ? (
              <td onClick={this.props.fetchPosts}>
                <u style={{ cursor: "pointer" }}>
                  {" "}
                  fetch all posts [{posts.length}]
                </u>
              </td>
            ) : (
              <td>{posts.length}</td>
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default UserInfo;
