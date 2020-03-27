import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/home/home';
import Error from './components/home/notfound';
import Navbar from "./components/navbar/Navbar";
import About from './components/pages/about';
import GithubState from "./context/state";
import User from "./components/users/user";
const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Switch>
              <Route exact path='/gitdig' component={Home} ></Route>
              <Route exact path='/gitdig/about' component={About}></Route>
              <Route exact path='/gitdig/user/:login' render={(props) => (
                <User {...props}
                />
              )}></Route>
              <Route component={Error}></Route>
            </Switch>
          </div>
        </div >

      </Router >
    </GithubState>
  );
}

export default App;
