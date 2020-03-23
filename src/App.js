import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/users";
import User from "./components/users/user";
import axios from 'axios';
import Search from './components/search/search';
import Alert from './components/layout/alert';
import About from './components/pages/about';

const App = () => {
  const defaultUser = 'nvjot94';
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let result = axios.get(`https://api.github.com/search/users?q=${defaultUser}`);
    result.then(response => {
      setUsers(response.data.items);
    })
    // eslint - disable - next - line
  }, []);
  const getUserRepos = async (username) => {
    setLoading(true);
    let result = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    setRepos(result.data);
    setLoading(false);
  };
  const getSingleUser = async (username) => {
    setLoading(true);
    var result = await axios.get(`https://api.github.com/users/${username}`);
    setLoading(true);
    setUser(result.data);
  };

  const searchUser = async (text) => {
    setLoading(true);
    var result = await axios.get(`https://api.github.com/search/users?q=${text}`);
    setLoading(false);
    setUsers(result.data.items);
  };

  const clearScreen = () => {
    setUsers([]);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Switch>
            <Route exact path='/' render={(props) => (

              <Fragment>
                <Alert alert={alert} />
                <Search searchUser={searchUser}
                  clearScreen={clearScreen}
                  showClearButton={users.length > 0 ? true : false}
                  showAlert={showAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )

            }>
            </Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/user/:login' render={(props) => (
              <User {...props} getUser={getSingleUser}
                user={user}
                loading={loading}
                getUserRepos={getUserRepos}
                repos={repos}
              />
            )}></Route>
          </Switch>



        </div>
      </div >
    </Router >
  );
}

export default App;
