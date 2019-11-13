import React, { useEffect } from "react";

let intervalId;
export function Header(props) {
  const { selectedFromPocketCurrency, onFetchRates, timer = 10000 } = props;

  useEffect(() => {
    onFetchRates(selectedFromPocketCurrency);
    intervalId = setInterval(() => {
      onFetchRates(selectedFromPocketCurrency);
    }, timer);
    // cleanup up interval
    return () => {
      clearInterval(intervalId);
    };
  }, [onFetchRates, timer, selectedFromPocketCurrency]);

  return (
    <header className="app__header">
      <h1>Demo trading app</h1>
    </header>
  );
}
