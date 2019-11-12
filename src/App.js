import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./components/PocketList/PocketList";

import Header from "components/Header/Header";
import PocketListContainer from "components/PocketList/PocketListContainer";
import RatesContainer from "components/Rates/RatesContainer";
import ConverterContainer from "components/Converter/ConverterContainer";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app__main">
          <Switch>
            <Route path="/pocket" component={PocketListContainer}></Route>
            <Route path="/exchange" component={ConverterContainer}></Route>
            <Route path="/Rates" component={RatesContainer}></Route>
            <Route path="/history">
              <h1>History (Coming soon)</h1>
            </Route>
          </Switch>
        </div>

        <Navbar fixed="bottom" className="app__navbar">
          <Link to="/pocket">Pocket</Link>
          <Link to="/rates">Rates</Link>
          <Link to="/exchange">Exchange</Link>
          <Link to="/history">History</Link>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
