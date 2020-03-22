import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/users";
import axios from 'axios';
import Search from './components/search/search';
class App extends React.Component {
  state = {
    defaultUser: 'nvjot94',
    loading: false,
    users: []
  }
  async componentDidMount() {
    let result = await axios.get
      (`https://api.github.com/search/users?q=${this.state.defaultUser}`);
    this.setState({ loading: false, users: result.data.items })
  };
  searchUser = async (text) => {

    var result = await axios.get(`https://api.github.com/search/users?q=${text}`);
    console.log(result.data.items);
    this.setState({ loading: false, users: result.data.items })
  };

  clearScreen = () => {
    this.setState({ users: [] });
  }

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Search searchUser={this.searchUser} clearScreen={this.clearScreen} showClearButton={this.state.users.length > 0 ? true : false} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div >
    );
  }
}

export default App;
