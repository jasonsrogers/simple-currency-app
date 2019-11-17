import fetch from "cross-fetch";

export function getRates(currency = "USD") {
  // can't get other currency without upgrading account so hard coded the base currency
  try {
    return fetch(
      `https://api.exchangeratesapi.io/latest?base=${currency}`
    ).then(response => response.json());
  } catch (error) {
    console.error("Failed to load currency, TBC what to do: ", error);
  }
}
// Note: possibility to round further than 2 decimal points, currently not used but it's there for free ^^
export function roundValue(val, dec = 2) {
  return val.toFixed(dec) * 1;
}

// 0.1 + 0.2 ==> 0.30000000000000004
// this is why you round the result of operations with decimals (this is due to how floats as processed)
export function roundAdd(...nums) {
  return roundValue(
    nums.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    })
  );
}

export function roundSub(...nums) {
  return roundValue(
    nums.reduce((accumulator, currentValue) => {
      return accumulator - currentValue;
    })
  );
}
