import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/users";
import User from "./components/users/user";

import Search from './components/search/search';
import Alert from './components/layout/alert';
import About from './components/pages/about';
import GithubState from "./context/state";
const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Switch>
              <Route exact path='/' render={(props) => (

                <Fragment>
                  <Alert alert={alert} />
                  <Search />
                  <Users />
                </Fragment>
              )

              }>
              </Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={(props) => (
                <User {...props}
                />
              )}></Route>
            </Switch>
          </div>
        </div >
      </Router >
    </GithubState>
  );
}

export default App;
