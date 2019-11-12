import React from "react";
import { useInput } from "hooks/input-hook";

// import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router-dom";

// TODO: make exchange navigate back to pockets page


export function ConversionForm(props) {
    //
    // const history = useHistory();
  
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
  
    // Helper function for rounding
    // TODO: move to shared helper class to reuse in other areas
    function roundNumber(value) {
      // not sure if truncating or rounding it better
      return value.toFixed(2) * 1;
      // return Math.round(value * 100) / 100;
    }
  
    // helper function to extract rate
    function getCurrencyExchangeRate(rates = {}, toCurrency) {
      return rates[toCurrency];
    }
  
    // handle input of from currency
    // it will cap the value to the max of the selected pocket
    // Maybe displaying message if it excess would be a better experience
    function onFromChange({ value, rate, pocket }) {
      let fromValue = Math.max(0, value);
      fromValue = Math.min(pocket.amount, fromValue);
  
      let newToValue = fromValue * rate;
      newToValue = roundNumber(newToValue);
      setToValue(newToValue);
      return fromValue;
    }

    // handle input of to currency
    // it will cap the value to match the converted max of the selected from pocket
    // Maybe displaying message if it excess would be a better experience
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
    // Boiler plate hooks for inputs
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
  
    // handle the actual transfer
    const handleSubmit = evt => {
      evt.preventDefault();
  
      onTransferFunds({
        fromPocketCode: fromPocket.code,
        fromValue,
        toPocketCode: toPocket.code,
        toValue
      });
      resetFromValue();
      resetToValue();
  
      // TODO: causes problem with jest, disabled for now
      // history.push("/pocket");
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
        // Submit enables only if we have entered values
      const isEnabled = fromValue && toValue;
  
      return (
        <form className="conversion-form__container" onSubmit={handleSubmit}>
          <div className="conversion-form__from-field">
            <label>
              From Value {fromPocket.code}:
              <input
                className="conversion-form__from-value"
                type="number"
                {...bindFromValue}
              />
            </label>
          </div>
          <div className="conversion-form__to-field">
            <label>
              To Value {toPocket.code}:
              <input
                className="conversion-form__to-value"
                type="number"
                {...bindToValue}
              />
            </label>
          </div>
          <div className="conversion-form__footer">
            <div>Current rate: {rate}</div>
            <div className="conversion-form__action-container">
              <input
                className="conversion-form__exchange"
                type="submit"
                value="Exchange"
                disabled={!isEnabled}
              />
              {listUnSelectedPockets.map(([key, value]) => (
                // TODO: why is replacing this by Button failing my tests but counting the button twice?
                <button
                  key={value.code}
                  className="conversion-form__switch-currency"
                  onClick={() => {
                    onSelectToPocket(value.code);
                  }}
                >
                  To: {value.code}
                </button>
              ))}
            </div>
          </div>
        </form>
      );
    } else {
      return <div>No pocket selected yet</div>;
    }
  }