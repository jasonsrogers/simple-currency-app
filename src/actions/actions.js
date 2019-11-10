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

export const TRANSFER_FUNDS = "TRANSFER_FUNDS";
export function transferFunds({
  fromPocketCode,
  fromValue,
  toPocketCode,
  toValue
} = {}) {
  return {
    type: TRANSFER_FUNDS,
    fromPocketCode,
    fromValue,
    toPocketCode,
    toValue
  };
}

export function fetchRates(currency) {
  return dispatch => {
    dispatch(requestRates(currency));
    return getRates(currency).then(json =>
      dispatch(receiveRates(currency, json))
    );
  };
}
