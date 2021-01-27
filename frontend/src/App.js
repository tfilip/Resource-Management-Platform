import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Organisation from "./components/organisation";
import Reservation from "./components/reservation";
import Resource from "./components/resource";
import Datepic from './components/datepicker/Datepic'  
import Datefce from "./components/datepicker/Datefce";  
import Timepicker from "./components/datepicker/Timepicker";  

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>RemoteStack</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Org"}>Organisation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Resource"}>Resource</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Reserv"}>Reservation</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/Org" component={Organisation} />
            <Route path="/Resource" component={Resource} />
            <Route path="/Reserv" component={Reservation} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;