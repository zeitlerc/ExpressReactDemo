import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import LaunchSearch from './Launch/LaunchSearch';
import About from './About';
import './_custom.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">SpaceX Launches</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to="/" className="nav-link">Search</Link></li>
                <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
              </ul>
            </div>
          </nav>
            <div className="container">
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/" component={LaunchSearch} />
              </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
