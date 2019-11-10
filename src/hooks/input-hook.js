import { useState } from "react";

export const useInput = (initialValue, changeCallback = i => i) => {
  const [value, setValue] = useState(initialValue);

  // expose field hooks to be manipulated from parent
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        // this allows processing of value by parent (aka check min, max, precision...)
        let processedValue = changeCallback(event.target.value);
        if (processedValue === undefined) {
          console.log(
            `Unexpected empty processed value, changeCallback didn't receive a value to set in the field`
          );
        }
        setValue(processedValue);
      }
    }
  };
};
