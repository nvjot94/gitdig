import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/users";
import axios from 'axios';
class App extends React.Component {
  state = {
    loading: false,
    users: []
  }
  async componentDidMount() {
    var result = await axios.get('https://api.github.com/users');
    this.setState({ loading: false, users: result.data })
  };
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div >
    );
  }
}

export default App;
