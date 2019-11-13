import React, { useEffect } from "react";

function Rate(props) {
  const { rates = [] } = props;
  return Object.entries(rates).map(([key, value]) => (
    <div className="rates__rate" key={key}>
      {key}: {value}
    </div>
  ));
}

function SelectedRateInfo(props) {
  const { selectedRateInfo } = props;
  if (selectedRateInfo) {
    const { base, date, rates } = selectedRateInfo;
    return (
      <div>
        <div className="rates__info">
          <div className="rates__base">Base: {base}</div>
          <div className="rates__date">Date: {date}</div>
        </div>
        <div className="rates__list">
          <Rate rates={rates} />
        </div>
      </div>
    );
  } else {
    return <div>No selectedPocketRates</div>;
  }
}

// Simple component to render list of Rates
function Rates(props) {
  const { selectedFromPocketCurrency, selectedRateInfo, onFetchRates } = props;
  useEffect(() => {
    onFetchRates(selectedFromPocketCurrency);
  }, [onFetchRates, selectedFromPocketCurrency]);

  return (
    <div>
      <h1>Rates:</h1>
      <SelectedRateInfo selectedRateInfo={selectedRateInfo} />
    </div>
  );
}

export { Rates };
