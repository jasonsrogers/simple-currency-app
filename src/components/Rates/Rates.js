import React, { useEffect } from "react";


// TODO: move into separate component ? 
function renderRates(rates = []) {
  return Object.entries(rates).map(([key, value]) => (
    <div className="rates__rate" key={key}>
      {key}: {value}
    </div>
  ));
}
// TODO: move into separate component ? 
function renderSelectedRateInfo(selectedPocketRates = {}) {
  let { selectedRateInfo } = selectedPocketRates;
  if (selectedRateInfo) {
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

// Simple component to render list of Rates
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
