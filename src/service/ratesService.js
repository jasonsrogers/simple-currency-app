import fetch from "cross-fetch";

const apiKey = "6027d8b37baf4717a598e74d9ecae815";

function getRates(/*currency*/) {
  // can't get other currency without upgrading account so hard coded the base currency
  let currency = "USD";
  return fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${currency}`
  ).then(response => response.json());
}

export { getRates };
