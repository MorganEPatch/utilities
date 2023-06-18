import './App.scss';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BaseConverter from "./features/BaseCoverter";
import Ciphers from "./features/Ciphers";
import Diff from "./features/Diff";
import JSONFormatter from "./features/JSONFormatter";
import FrontPage from "./features/FrontPage";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/baseconv">Conversions</Link>
            </li>
            <li>
              <Link to="/ciphers">Ciphers</Link>
            </li>
            <li>
              <Link to="/diff">Text Diff</Link>
            </li>
            <li>
              <Link to="/jsonformat">JSON Formatter</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/baseconv">
            <BaseConverter />
          </Route>
          <Route path="/ciphers">
            <Ciphers />
          </Route>
          <Route path="/diff">
            <Diff />
          </Route>
          <Route path="/jsonformat">
            <JSONFormatter />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
