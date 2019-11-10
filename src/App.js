import React from "react";

import logo from "./logo.svg";
import "./App.css";

import "./components/PocketList/PocketList";
import PocketListContainer from "components/PocketList/PocketListContainer";
import RatesContainer from "components/Rates/RatesContainer";
import ConverterContainer from "components/Converter/ConverterContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TEST basic trading app</h1>
      </header>
      <PocketListContainer />
      <ConverterContainer />
      <RatesContainer />
    </div>
  );
}

export default App;
