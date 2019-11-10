import fetch from "cross-fetch";
import { fetchRates } from "actions/actions";

const apiKey = "6027d8b37baf4717a598e74d9ecae815";

let intervalId = undefined;

function getRates(/*currency*/) {
  console.log("fetchRates");
  // can't get other currency without upgrading account
  let currency = "USD";
  return fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${currency}`
  ).then(response => response.json());
}

export { getRates };
