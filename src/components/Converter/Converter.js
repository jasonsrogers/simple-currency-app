import React from "react";
import { useInput } from "hooks/input-hook";

function ConversionForm(props) {
  const {
    selectedPocketRates,
    toPocket = {},
    fromPocket = {},
    onTransferFunds
  } = props;

  const { selectedRateInfo = {} } = selectedPocketRates;
  const { rates } = selectedRateInfo;
  const rate = getCurrencyExchangeRate(rates, toPocket.code);

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

  if (rate) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          From Value:
          <input type="number" {...bindFromValue} />
        </label>
        <label>
          To Value:
          <input type="number" {...bindToValue} />
        </label>
        <div>Current rate: {rate}</div>
        <input type="submit" value="Submit" />
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
    onTransferFunds
  } = props;
  const fromPocket = pockets[selectedFromPocketCurrency];
  const toPocket = pockets[selectedToPocketCurrency];
  return (
    <div>
      <h1>Converter</h1>

      <ConversionForm
        selectedPocketRates={selectedPocketRates}
        fromPocket={fromPocket}
        toPocket={toPocket}
        onTransferFunds={onTransferFunds}
      />
    </div>
  );
}

export { Converter };
