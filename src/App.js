import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/users";
import User from "./components/users/user";
import axios from 'axios';
import Search from './components/search/search';
import Alert from './components/layout/alert';
import About from './components/pages/about';
class App extends React.Component {
  state = {
    defaultUser: 'nvjot94',
    user: {},
    loading: false,
    users: [],
    alert: null,
    repos: []
  }
  async componentDidMount() {
    let result = await axios.get
      (`https://api.github.com/search/users?q=${this.state.defaultUser}`);
    this.setState({ loading: false, users: result.data.items })
  };
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    let result = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    this.setState({ repos: result.data, loading: false });
  };
  getSingleUser = async (username) => {
    this.setState({ loading: true })
    var result = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({ user: result.data, loading: false });
  };
  searchUser = async (text) => {
    var result = await axios.get(`https://api.github.com/search/users?q=${text}`);

    this.setState({ loading: false, users: result.data.items })
  };

  clearScreen = () => {
    this.setState({ users: [] });
  };

  showAlert = (msg, type) => {

    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);

  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Switch>
              <Route exact path='/' render={(props) => (

                <Fragment>
                  <Alert alert={this.state.alert} />
                  <Search searchUser={this.searchUser} clearScreen={this.clearScreen}
                    showClearButton={this.state.users.length > 0 ? true : false}
                    showAlert={this.showAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )

              }>
              </Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={(props) => (
                <User {...props} getUser={this.getSingleUser}
                  user={this.state.user}
                  loading={this.state.loading}
                  getUserRepos={this.getUserRepos}
                  repos={this.state.repos}
                />
              )}></Route>
            </Switch>



          </div>
        </div >
      </Router >
    );

  }
}

export default App;
