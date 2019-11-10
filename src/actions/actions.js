import { getRates } from "service/ratesService";

export const REQUEST_RATES = "REQUEST_RATES";

function requestRates(currency) {
  return {
    type: REQUEST_RATES,
    currency
  };
}

export const RECEIVE_RATES = "RECEIVE_RATES";
function receiveRates(currency, selectedRateInfo) {
  return {
    type: RECEIVE_RATES,
    currency,
    selectedRateInfo,
    receivedAt: Date.now()
  };
}

export function fetchRates(currency) {
  return dispatch => {
    dispatch(requestRates(currency));
    return getRates().then(json => dispatch(receiveRates(currency, json)));
  };
}
