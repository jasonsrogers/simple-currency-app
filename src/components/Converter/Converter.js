import React from "react";
import { useInput } from "hooks/input-hook";

function Converter(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: {},
    rate = 1.23
  } = props;

  function onFromChange(value) {
    console.log("Validate ", value);
    setToValue(value * rate);
    return value;
  }
  function onToChange(value) {
    console.log("Validate ", value);
    setFromValue(value / rate);
    return value;
  }

  const {
    value: fromValue,
    bind: bindFromValue,
    reset: resetFromValue,
    setValue: setFromValue
  } = useInput("", onFromChange);
  const {
    value: toValue,
    bind: bindToValue,
    reset: resetToValue,
    setValue: setToValue
  } = useInput("", onToChange);

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Converting From: ${fromValue}, To: ${toValue}`);
    resetFromValue();
    resetToValue();
  };

  return (
    <div>
      <h1>Converter</h1>
      <div>Current rate: 1.23</div>
      <form onSubmit={handleSubmit}>
        <label>
          From Value:
          <input type="number" {...bindFromValue} />
        </label>
        <label>
          To Value:
          <input type="number" {...bindToValue} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export { Converter };
