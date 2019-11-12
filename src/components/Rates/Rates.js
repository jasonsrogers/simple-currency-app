import React, { useEffect } from "react";

function renderRates(rates = []) {
  return Object.entries(rates).map(([key, value]) => (
    <div className="rates__rate" key={key}>
      {key}: {value}
    </div>
  ));
}

function renderSelectedRateInfo(selectedPocketRates = {}) {
  let { selectedRateInfo } = selectedPocketRates;
  if (selectedRateInfo) {
    /*
    rates: {
          CAD: 1.3196483596,
          GBP: 0.7808410368,
          JPY: 109.4072865688,
          THB: 30.3851731013,
          CHF: 0.9961029545,
          EUR: 0.9062896502,
          USD: 1.0,
          ...
        },
        base: "USD",
        date: "2019-11-08"
      } */
    const { base, date, rates } = selectedRateInfo;
    return (
      <div>
        <div className="rates__info">
          <div className="rates__base">Base: {base}</div>
          <div className="rates__date">Date: {date}</div>
        </div>
        <div className="rates__list">{renderRates(rates)}</div>
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
    state: { selectedPocketRates, selectedFromPocketCurrency },
    onFetchRates
  } = props;
  useEffect(() => {
    onFetchRates(selectedFromPocketCurrency);
  }, [onFetchRates, selectedFromPocketCurrency]);

  return (
    <div>
      <h1>Rates:</h1>
      {renderSelectedRateInfo(selectedPocketRates)}
    </div>
  );
}

export { Rates };
