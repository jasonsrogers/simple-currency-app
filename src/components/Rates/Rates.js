import React, { useState, useEffect } from "react";

let intervalId;

function renderRates(rates = []) {
  return Object.entries(rates).map(([key, value]) => (
    <div key={key}>
      {key}: {value}
    </div>
  ));
}

function renderSelectedRateInfo(selectedPocketRates = {}) {
  let { selectedRateInfo } = selectedPocketRates;
  if (selectedRateInfo) {
    /*
        base: "USD"
        disclaimer: "Usage subject to terms: https://openexchangerates.org/terms"
        license: "https://openexchangerates.org/license"
        rates: {AED: 3.6728, AFN: 78.250004, ALL: 111.7, AMD: 477.571994, ANG: 1.734311, …}
        timestamp: 1573351212
     */
    const { base, timestamp, rates } = selectedRateInfo;
    return (
      <div>
        <div>Base: {base}</div>
        <div>Timestamp: {timestamp}</div>
        <div>Rates: {renderRates(rates)}</div>
      </div>
    );
  } else {
    return <div>No selectedPocketRates</div>;
  }
}

function Rates(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: { selectedPocketRates },
    onFetchRates
  } = props;

  useEffect(() => {
    onFetchRates();
    intervalId = setInterval(() => {
      onFetchRates();
    }, 10000);
    // cleanup up interval componentDidUnmount
    return () => {
      clearInterval(intervalId);
    };
  }, [onFetchRates]);

  return (
    <div>
      <h1>Rates</h1>
      {renderSelectedRateInfo(selectedPocketRates)}
    </div>
  );
}

export { Rates };
