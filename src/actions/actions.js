import { getRates } from "service/ratesService";

export const SELECT_TO_POCKET = "SELECT_TO_POCKET";
export function selectToPocket(code) {
  return {
    type: SELECT_TO_POCKET,
    code
  };
}

export const SELECT_FROM_POCKET = "SELECT_FROM_POCKET";
export function changeFromPocket(code) {
  return {
    type: SELECT_FROM_POCKET,
    code
  };
}

// Note: select from is a 2 step process as we want to update the rates displayed
export function selectFromPocket(code) {
  return dispatch => {
    dispatch(changeFromPocket(code));
    dispatch(fetchRates(code));
  };
}

//selectedFromPocketCurrency

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
    selectedRateInfo
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
