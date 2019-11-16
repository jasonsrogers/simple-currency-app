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

export function roundValue(val, dec = 2) {
  return val.toFixed(dec) * 1;
}
