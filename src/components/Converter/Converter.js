import React from "react";
import { useInput } from "hooks/input-hook";

function ConversionForm(props) {
  const {
    selectedPocketRates,
    onTransferFunds,
    onSelectToPocket,
    pockets,
    selectedFromPocketCurrency,
    selectedToPocketCurrency
  } = props;
  const fromPocket = pockets[selectedFromPocketCurrency];
  const toPocket = pockets[selectedToPocketCurrency] || {};

  const { selectedRateInfo = {} } = selectedPocketRates;
  const { rates } = selectedRateInfo;
  let rate;

  function roundNumber(value) {
    // not sure if truncating or rounding it better
    return value.toFixed(2) * 1;
    // return Math.round(value * 100) / 100;
  }

  function getCurrencyExchangeRate(rates = {}, toCurrency) {
    return rates[toCurrency];
  }

  function onFromChange({ value, rate, pocket }) {
    let fromValue = Math.max(0, value);
    fromValue = Math.min(pocket.amount, fromValue);

    let newToValue = fromValue * rate;
    newToValue = roundNumber(newToValue);
    setToValue(newToValue);
    return fromValue;
  }
  function onToChange({ value, rate, pocket }) {
    let maxFromPocketAmount = pocket.amount * rate;
    maxFromPocketAmount = roundNumber(maxFromPocketAmount);

    let newToValue = Math.max(0, value);
    newToValue = Math.min(maxFromPocketAmount, newToValue);

    let newFromValue = newToValue / rate;
    newFromValue = roundNumber(newFromValue);

    setFromValue(newFromValue);
    return newToValue;
  }
  const {
    value: fromValue,
    bind: bindFromValue,
    reset: resetFromValue,
    setValue: setFromValue
  } = useInput("", value => {
    return onFromChange({ value, rate, pocket: fromPocket });
  });
  const {
    value: toValue,
    bind: bindToValue,
    reset: resetToValue,
    setValue: setToValue
  } = useInput("", value => {
    return onToChange({ value, rate, pocket: fromPocket });
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    // alert(`Converting From: ${fromValue}, To: ${toValue}`);

    onTransferFunds({
      fromPocketCode: fromPocket.code,
      fromValue,
      toPocketCode: toPocket.code,
      toValue
    });
    resetFromValue();
    resetToValue();
  };

  if (rates) {
    rate = getCurrencyExchangeRate(rates, toPocket.code);

    const listUnSelectedPockets = Object.entries(pockets).filter(
      ([key, value]) => {
        return !(
          key === selectedFromPocketCurrency || key === selectedToPocketCurrency
        );
      }
    );

    return (
      <form onSubmit={handleSubmit}>
        <label>
          From Value {fromPocket.code}:
          <input type="number" {...bindFromValue} />
        </label>
        <label>
          To Value {toPocket.code}:
          <input type="number" {...bindToValue} />
        </label>
        <div>Current rate: {rate}</div>
        <input type="submit" value="Submit" />
        {listUnSelectedPockets.map(([key, value]) => (
          <button
            onClick={() => {
              onSelectToPocket(value.code);
            }}
          >
            Conver to: {value.code}
          </button>
        ))}
      </form>
    );
  } else {
    return <div>No pocket selected yet</div>;
  }
}

function Converter(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: {
      selectedPocketRates,
      selectedFromPocketCurrency,
      selectedToPocketCurrency,
      pockets
    },
    onTransferFunds,
    onSelectToPocket
  } = props;
  return (
    <div>
      <h1>Converter</h1>

      <ConversionForm
        selectedPocketRates={selectedPocketRates}
        pockets={pockets}
        selectedFromPocketCurrency={selectedFromPocketCurrency}
        selectedToPocketCurrency={selectedToPocketCurrency}
        onTransferFunds={onTransferFunds}
        onSelectToPocket={onSelectToPocket}
      />
    </div>
  );
}

export { Converter };
