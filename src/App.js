import React, { Component } from "react";
import axios from "axios";
import User from "./User";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedUserId: "",
    };
  }
  async componentDidMount() {
    const users = (await axios.get("/api/users")).data;
    this.setState({ users });
    //console.log(users);
    window.addEventListener("hashchange", () => {
      this.setState({ selectedUserId: window.location.hash.slice(1) }); //!keeping track of the selected user. When refreshed, does not display the hash
    });
    this.setState({ selectedUserId: window.location.hash.slice(1) }); //! not only when hash changes, but when component mounts, grabs selected user. User's hash is still displayed even when refreshed
  }
  render() {
    const { users, selectedUserId } = this.state;
    return (
      <div>
        <h1>Acme Users</h1>
        <ul>
          <li>
            <a href="#">All </a>
          </li>
          {users.map((user) => {
            return (
              <li
                className={selectedUserId * 1 === user.id ? "selected" : ""} //! need to mutiply by 1 because hash is a STRING, and i need ID
                key={user.id}
              >
                <a href={`#${user.id}`}>{user.name}</a>
              </li>
            );
          })}
        </ul>
        <div>
          {!!selectedUserId && <User selectedUserId={selectedUserId} />}
        </div>
      </div>
    );
  }
}

export default App;
