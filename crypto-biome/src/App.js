import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// import components
import Navbar from "./components/navbar";

// import pages
import Landing from "./pages/landing";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="body-wrapper">
          <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/home" exact component={Home}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
